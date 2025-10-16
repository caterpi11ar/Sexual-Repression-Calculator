/**
 * 评估页面 - 问卷系统主界面
 * 负责管理整个评估流程，包括知情同意、人口学信息、量表问卷等
 */

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertTriangle, ArrowLeft, Brain, CheckCircle, Home } from 'lucide-react';
import { AssessmentSession, Demographics, Response, AssessmentResults, DimensionScores, NormativeData, ScaleScore, SRI_LEVELS, SRIResult } from '@/types';
import { saveAssessmentSession } from '@/lib/storage';
import { ConsentForm } from '@/components/assessment/consent-form';
import { DemographicsForm } from '@/components/assessment/demographics-form';
import { QuestionnaireSection } from '@/components/assessment/questionnaire-section';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { ALL_SCALES } from '@/lib/scales';

type AssessmentStep = 'consent' | 'demographics' | 'questionnaire' | 'processing' | 'completed';

export default function Assessment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  // 获取评估类型
  const assessmentType = (searchParams.get('type') as 'quick' | 'full') || 'quick';

  // 状态管理
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('consent');
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [demographics, setDemographics] = useState<Demographics | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);
  const [session, setSession] = useState<AssessmentSession | null>(null);
  const [pendingProgress, setPendingProgress] = useState<{
    demographics?: Demographics;
    responses: Response[];
  } | null>(null);
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  const [hasCheckedProgress, setHasCheckedProgress] = useState(false);
  const closingProgressDialogRef = useRef(false);
  const [resumeToken, setResumeToken] = useState<number | null>(null);


  /**
   * 标准正态分布累积分布函数 (CDF)
   * 用于将z分数转换为0-100的百分位数
   */
  function normalCDF(x: number): number {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x) / Math.sqrt(2.0);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return 0.5 * (1.0 + sign * y);
  }

  /**
   * 计算响应的原始分数
   * @param responses 用户响应数组
   * @param scaleId 量表ID
   * @returns 原始分数
   */
  function calculateRawScore(responses: Response[], scaleId: string): number {
    const scale = ALL_SCALES[scaleId];
    if (!scale) {
      console.warn(t('assessmentPage.calculation.unknownScale', { scaleId }));
      return 0;
    }

    const scaleResponses = responses.filter(r =>
      scale.questions.some(q => q.id === r.questionId)
    );

    // 如果没有该量表的回答，返回0
    if (scaleResponses.length === 0) {
      return 0;
    }

    let totalScore = 0;

    for (const response of scaleResponses) {
      const question = scale.questions.find(q => q.id === response.questionId);
      if (question) {
        // 验证回答值的有效性
        const validValues = question.options.map(o => o.value);
        if (!validValues.includes(response.value)) {
          console.warn(t('assessmentPage.calculation.invalidResponse', { value: response.value, questionId: question.id }));
          continue;
        }

        // 处理反向计分
        let score = response.value;
        if (question.reverse) {
          const maxValue = Math.max(...validValues);
          const minValue = Math.min(...validValues);
          score = maxValue + minValue - score;
        }
        totalScore += score;
      }
    }

    return totalScore;
  }

  /**
   * 计算z分数（标准化分数）
   * @param rawScore 原始分数
   * @param mean 均值
   * @param stdDev 标准差
   * @returns z分数
   */
  function calculateZScore(rawScore: number, mean: number, stdDev: number): number {
    if (stdDev === 0) return 0;
    return (rawScore - mean) / stdDev;
  }

  /**
   * 获取默认常模数据（基于文献的参考值）
   * 实际应用中应该使用本地样本建立常模
   */
  function getDefaultNorms(): NormativeData {
    return {
      sampleSize: 1000, // 模拟样本大小
      means: {
        // SIS/SES-SF参考均值（基于文献）
        'sis_total': 35.2,
        'ses_total': 16.8,
        'sis1_total': 15.4,
        'sis2_total': 19.8,

        // SIS/SES完整版参考均值
        'sis_ses_full_sis': 87.5,
        'sis_ses_full_ses': 42.8,

        // Mosher性内疚参考均值
        'mosher_guilt': 25.6,
        'mosher_guilt_full': 62.7,

        // KISS-9性羞耻参考均值  
        'kiss9_shame': 18.7,

        // SOS筛查版参考均值
        'sos_screening': 15.3,
        'sos_full': 63.0,

        // BSAS性态度量表参考均值
        'bsas_brief': 69.2,

        // 适应性量表参考均值
        'teen_sexual_attitudes': 25.0,
        'sexual_cognition': 28.5,
        'sis_ses_adapted': 24.0
      },
      standardDeviations: {
        'sis_total': 8.9,
        'ses_total': 3.7,
        'sis1_total': 4.1,
        'sis2_total': 5.2,

        // 完整版标准差
        'sis_ses_full_sis': 18.3,
        'sis_ses_full_ses': 9.2,
        'mosher_guilt': 7.8,
        'mosher_guilt_full': 19.2,
        'kiss9_shame': 6.4,
        'sos_screening': 4.6,
        'sos_full': 12.8,
        'bsas_brief': 15.4,

        // 适应性量表标准差
        'teen_sexual_attitudes': 6.2,
        'sexual_cognition': 7.1,
        'sis_ses_adapted': 5.8
      },
      updatedAt: new Date()
    };
  }

  /**
   * 计算SIS/SES相关分数
   * @param responses 用户响应
   * @param norms 常模数据
   * @returns SIS/SES分数对象
   */
  function calculateSisSeScores(responses: Response[], norms: NormativeData) {
    // 动态获取SES问题（支持不同量表版本）
    const sesResponses = responses.filter(r => r.questionId.startsWith('ses_'));
    const sesRaw = sesResponses.reduce((sum, r) => sum + r.value, 0);

    // 动态获取SIS1问题
    const sis1Responses = responses.filter(r => r.questionId.startsWith('sis1_'));
    const sis1Raw = sis1Responses.reduce((sum, r) => sum + r.value, 0);

    // 动态获取SIS2问题
    const sis2Responses = responses.filter(r => r.questionId.startsWith('sis2_'));
    const sis2Raw = sis2Responses.reduce((sum, r) => sum + r.value, 0);

    // SIS总分
    const sisTotal = sis1Raw + sis2Raw;

    // 根据题目数量调整常模（快测版vs完整版）
    const sesCount = sesResponses.length;
    const sisCount = sis1Responses.length + sis2Responses.length;

    // 动态调整均值和标准差
    const sesMean = sesCount <= 4 ? 16.8 : 42.8; // 快测版 vs 完整版
    const sesStd = sesCount <= 4 ? 3.7 : 9.2;
    const sisMean = sisCount <= 10 ? 35.2 : 87.5; // 调整完整版的均值
    const sisStd = sisCount <= 10 ? 8.9 : 18.3;

    // 计算z分数
    const sesZ = calculateZScore(sesRaw, norms.means['ses_total'] || sesMean, norms.standardDeviations['ses_total'] || sesStd);
    const sisZ = calculateZScore(sisTotal, norms.means['sis_total'] || sisMean, norms.standardDeviations['sis_total'] || sisStd);

    return {
      sesRaw,
      sesZ,
      sis1Raw,
      sis2Raw,
      sisTotal,
      sisZ,
      sisOverSes: sisZ - sesZ // SIS相对SES优势
    };
  }

  /**
   * 计算四维度分数
   * @param responses 用户响应
   * @param norms 常模数据 
   * @returns 四维度分数
   */
  function calculateDimensionScores(responses: Response[], norms: NormativeData): DimensionScores {
    // 1. SOS反向分数 - 动态检测使用的量表版本
    let sosRaw = 0;
    let sosZ = 0;

    // 尝试完整版SOS
    const sosFullResponses = responses.filter(r => r.questionId.startsWith('sos_'));
    if (sosFullResponses.length > 5) {
      // 完整版SOS
      sosRaw = sosFullResponses.reduce((sum, r) => sum + r.value, 0);
      sosZ = calculateZScore(sosRaw, norms.means['sos_full'] || 63.0, norms.standardDeviations['sos_full'] || 12.8);
    } else if (sosFullResponses.length > 0) {
      // 筛查版SOS
      sosRaw = sosFullResponses.reduce((sum, r) => sum + r.value, 0);
      sosZ = calculateZScore(sosRaw, norms.means['sos_screening'] || 15.3, norms.standardDeviations['sos_screening'] || 4.6);
    }

    // 2. 性内疚分数 - 动态检测版本
    let guiltRaw = 0;
    let guiltZ = 0;

    const guiltResponses = responses.filter(r => r.questionId.startsWith('mg_'));
    if (guiltResponses.length > 10) {
      // 完整版Mosher
      guiltRaw = guiltResponses.reduce((sum, r) => sum + r.value, 0);
      guiltZ = calculateZScore(guiltRaw, norms.means['mosher_guilt_full'] || 62.7, norms.standardDeviations['mosher_guilt_full'] || 19.2);
    } else if (guiltResponses.length > 0) {
      // 简版Mosher
      guiltRaw = guiltResponses.reduce((sum, r) => sum + r.value, 0);
      guiltZ = calculateZScore(guiltRaw, norms.means['mosher_guilt'] || 25.6, norms.standardDeviations['mosher_guilt'] || 7.8);
    }

    // 3. 性羞耻分数（KISS-9保持不变，或者青少年性态度量表）
    let shameZ = 0;
    const shameResponses = responses.filter(r => r.questionId.startsWith('ks_'));
    const teenAttitudeResponses = responses.filter(r => r.questionId.startsWith('tsa_'));

    if (shameResponses.length > 0) {
      // 使用KISS-9量表
      const shameRaw = shameResponses.reduce((sum, r) => sum + r.value, 0);
      shameZ = calculateZScore(shameRaw, norms.means['kiss9_shame'] || 18.7, norms.standardDeviations['kiss9_shame'] || 6.4);
    } else if (teenAttitudeResponses.length > 0) {
      // 使用青少年性态度量表作为羞耻维度替代
      const teenRaw = teenAttitudeResponses.reduce((sum, r) => sum + r.value, 0);
      shameZ = calculateZScore(teenRaw, norms.means['teen_sexual_attitudes'] || 25.0, norms.standardDeviations['teen_sexual_attitudes'] || 6.2);
    }

    // 4. SIS相对SES优势（或性认知适应版）
    let sisOverSes = 0;
    const sexCognitionResponses = responses.filter(r => r.questionId.startsWith('sc_'));
    const sisAdaptedResponses = responses.filter(r => r.questionId.startsWith('sisa_'));

    if (sexCognitionResponses.length > 0 || sisAdaptedResponses.length > 0) {
      // 对于无性经验用户，使用性认知量表
      const cognitionRaw = sexCognitionResponses.reduce((sum, r) => sum + r.value, 0);
      const adaptedRaw = sisAdaptedResponses.reduce((sum, r) => sum + r.value, 0);
      const totalRaw = cognitionRaw + adaptedRaw;

      if (totalRaw > 0) {
        const mean = norms.means['sexual_cognition'] || 28.5;
        const std = norms.standardDeviations['sexual_cognition'] || 7.1;
        sisOverSes = calculateZScore(totalRaw, mean, std);
      }
    } else {
      // 标准SIS/SES计算
      const sisSeScores = calculateSisSeScores(responses, norms);
      sisOverSes = sisSeScores.sisOverSes;
    }

    return {
      sosReversed: sosZ, // SOS反向（越高越恐惧）
      sexGuilt: guiltZ,
      sexualShame: shameZ,
      sisOverSes: sisOverSes
    };
  }

  /**
   * 计算SRI指数（0-100）
   * @param dimensionScores 四维度分数
   * @returns SRI结果对象
   */
  function calculateSRI(dimensionScores: DimensionScores): SRIResult {
    // 等权重合成四维度z分数
    const compositeZ = (dimensionScores.sosReversed + dimensionScores.sexGuilt +
      dimensionScores.sexualShame + dimensionScores.sisOverSes) / 4;

    // 转换为0-100分数（使用标准正态CDF）
    const percentile = normalCDF(compositeZ) * 100;
    const totalScore = Math.round(Math.max(0, Math.min(100, percentile)));

    // 确定SRI等级
    let level: keyof typeof SRI_LEVELS = 'moderate';
    for (const [levelKey, levelData] of Object.entries(SRI_LEVELS)) {
      if (totalScore >= levelData.min && totalScore < levelData.max) {
        level = levelKey as keyof typeof SRI_LEVELS;
        break;
      }
    }

    return {
      totalScore,
      zScore: compositeZ,
      percentile,
      level,
      dimensionScores,
      scaleScores: [] // 会在主计算函数中填充
    };
  }

  /**
   * 主要的SRI计算函数
   * @param responses 用户所有响应
   * @param sessionId 会话ID
   * @param norms 常模数据（可选）
   * @returns 完整的评估结果
   */
  function calculateAssessmentResults(
    responses: Response[],
    sessionId: string,
    norms?: NormativeData
  ): AssessmentResults {
    if (!responses || responses.length === 0) {
      throw new Error(t('assessmentPage.calculation.noResponses'));
    }

    const normsData = norms || getDefaultNorms();

    // 计算各量表分数（只计算有数据的量表）
    const scaleScores: ScaleScore[] = [];

    for (const scaleId of Object.keys(ALL_SCALES)) {
      const rawScore = calculateRawScore(responses, scaleId);

      // 只有当量表有回答时才计算分数
      if (rawScore > 0) {
        const meanKey = `${scaleId.replace('_sf', '_total')}`;
        const mean = normsData.means[meanKey] || normsData.means[scaleId] || 0;
        const stdDev = normsData.standardDeviations[meanKey] || normsData.standardDeviations[scaleId] || 1;

        const zScore = calculateZScore(rawScore, mean, stdDev);
        const percentile = normalCDF(zScore) * 100;

        scaleScores.push({
          scaleId,
          rawScore,
          zScore,
          percentile: Math.max(0, Math.min(100, Math.round(percentile)))
        });
      }
    }

    // 验证是否有足够的数据进行计算
    if (scaleScores.length === 0) {
      throw new Error(t('assessmentPage.calculation.insufficientData'));
    }

    // 计算四维度分数
    const dimensionScores = calculateDimensionScores(responses, normsData);

    // 计算SRI指数
    const sri = calculateSRI(dimensionScores);
    sri.scaleScores = scaleScores;

    // 生成解释和建议
    const interpretation = generateInterpretation(sri);
    const recommendations = generateRecommendations(sri);

    return {
      sessionId,
      sri,
      interpretation,
      recommendations,
      calculatedAt: new Date()
    };
  }

  /**
   * 生成结果解释文案
   * @param sri SRI结果
   * @returns 解释文案数组
   */
  function generateInterpretation(sri: SRIResult): string[] {
    const level = SRI_LEVELS[sri.level];
    const interpretation = [
      t('assessmentPage.interpretation.score', { score: sri.totalScore, level: level.label }),
      t('assessmentPage.interpretation.description', { description: getInterpretationByLevel(sri.level) })
    ];

    // 添加维度分析
    const highDimensions = [];
    if (sri.dimensionScores.sosReversed > 1) highDimensions.push(t('assessmentPage.interpretation.dimension.sosReversed'));
    if (sri.dimensionScores.sexGuilt > 1) highDimensions.push(t('assessmentPage.interpretation.dimension.sexGuilt'));
    if (sri.dimensionScores.sexualShame > 1) highDimensions.push(t('assessmentPage.interpretation.dimension.sexualShame'));
    if (sri.dimensionScores.sisOverSes > 1) highDimensions.push(t('assessmentPage.interpretation.dimension.sisOverSes'));

    if (highDimensions.length > 0) {
      interpretation.push(t('assessmentPage.interpretation.dimensions', { dimensions: highDimensions.join('、') }));
    }

    return interpretation;
  }

  /**
   * 根据等级生成解释描述
   */
  function getInterpretationByLevel(level: keyof typeof SRI_LEVELS): string {
    const levelKeys = {
      'very-low': 'assessmentPage.interpretation.veryLow',
      'low': 'assessmentPage.interpretation.low',
      'moderate': 'assessmentPage.interpretation.moderate',
      'high': 'assessmentPage.interpretation.high',
      'very-high': 'assessmentPage.interpretation.veryHigh'
    };

    return t(levelKeys[level]);
  }

  /**
   * 生成个性化建议
   * @param sri SRI结果
   * @returns 建议文案数组
   */
  function generateRecommendations(sri: SRIResult): string[] {
    const recommendations = [];

    if (sri.level === 'very-high' || sri.level === 'high') {
      recommendations.push(t('assessmentPage.recommendations.professional'));
      recommendations.push(t('assessmentPage.recommendations.reading'));
    }

    if (sri.dimensionScores.sexGuilt > 1) {
      recommendations.push(t('assessmentPage.recommendations.guilt'));
    }

    if (sri.dimensionScores.sexualShame > 1) {
      recommendations.push(t('assessmentPage.recommendations.shame'));
    }

    if (sri.dimensionScores.sisOverSes > 1) {
      recommendations.push(t('assessmentPage.recommendations.anxiety'));
    }

    // 通用建议
    recommendations.push(t('assessmentPage.recommendations.communication'));
    recommendations.push(t('assessmentPage.recommendations.disclaimer'));

    return recommendations;
  }

  useEffect(() => {
    if (hasCheckedProgress) {
      return;
    }

    const savedProgress = localStorage.getItem('sri_assessment_progress');
    if (!savedProgress) {
      setHasCheckedProgress(true);
      return;
    }

    try {
      const data = JSON.parse(savedProgress);
      if (data.type !== assessmentType) {
        setHasCheckedProgress(true);
        return;
      }

      const savedDemographics = data.demographics as Demographics | undefined;
      type RawResponse = { questionId: string; value: number; timestamp: string };
      const rawResponses: RawResponse[] = Array.isArray(data.responses) ? data.responses : [];
      const restoredResponses: Response[] = rawResponses.map(item => ({
        questionId: item.questionId,
        value: item.value,
        timestamp: new Date(item.timestamp),
      }));

      if (!savedDemographics && restoredResponses.length === 0) {
        setHasCheckedProgress(true);
        return;
      }

      setPendingProgress({
        demographics: savedDemographics,
        responses: restoredResponses,
      });
      setShowProgressDialog(true);
      closingProgressDialogRef.current = false;
      setHasCheckedProgress(true);
    } catch (error) {
      console.error(t('error.progress.check'), error);
      setHasCheckedProgress(true);
    }
  }, [assessmentType, hasCheckedProgress, t]);

  const handleContinueProgress = () => {
    if (!pendingProgress) {
      closingProgressDialogRef.current = false;
      setShowProgressDialog(false);
      return;
    }

    closingProgressDialogRef.current = true;

    const baseSession: AssessmentSession = session ?? {
      id: sessionId,
      type: assessmentType,
      demographics: pendingProgress.demographics ?? ({} as Demographics),
      responses: [],
      startTime: new Date(),
      completed: false,
    };

    if (pendingProgress.demographics) {
      setDemographics(pendingProgress.demographics);
    }

    setResponses(pendingProgress.responses);

    const updatedSession: AssessmentSession = {
      ...baseSession,
      demographics: pendingProgress.demographics ?? baseSession.demographics,
      responses: pendingProgress.responses,
      completed: false,
      endTime: undefined,
    };

    setSession(updatedSession);
    saveAssessmentSession(updatedSession);

    setCurrentStep('questionnaire');
    setPendingProgress(null);
    setShowProgressDialog(false);
    setResumeToken(Date.now());
    setHasCheckedProgress(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [currentStep]);

  useEffect(() => {
    if (hasCheckedProgress) {
      return;
    }

    const savedProgress = localStorage.getItem('sri_assessment_progress');
    if (!savedProgress) {
      setHasCheckedProgress(true);
      return;
    }

    try {
      const data = JSON.parse(savedProgress);
      if (data.type !== assessmentType) {
        setHasCheckedProgress(true);
        return;
      }

      const savedDemographics = data.demographics as Demographics | undefined;
      type RawResponse = { questionId: string; value: number; timestamp: string };
      const rawResponses: RawResponse[] = Array.isArray(data.responses) ? data.responses : [];
      const restoredResponses: Response[] = rawResponses.map((item) => ({
        questionId: item.questionId,
        value: item.value,
        timestamp: new Date(item.timestamp),
      }));

      if (!savedDemographics && restoredResponses.length === 0) {
        setHasCheckedProgress(true);
        return;
      }

      setPendingProgress({
        demographics: savedDemographics,
        responses: restoredResponses,
      });
      setShowProgressDialog(true);
      setHasCheckedProgress(true);
    } catch (error) {
      console.error(t('error.progress.check'), error);
      setHasCheckedProgress(true);
    }
  }, [assessmentType, hasCheckedProgress, t]);


  const handleDiscardProgress = () => {
    closingProgressDialogRef.current = true;
    localStorage.removeItem('sri_assessment_progress');
    setPendingProgress(null);
    setShowProgressDialog(false);
    setHasCheckedProgress(true);
    setDemographics(null);
    setResponses([]);
    setCurrentStep('consent');
    setResumeToken(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (session) {
      setSession({
        ...session,
        demographics: {} as Demographics,
        responses: [],
        startTime: new Date(),
        completed: false,
        endTime: undefined,
      });
    }
  };

  const handleProgressDialogOpenChange = (open: boolean) => {
    if (!open) {
      if (closingProgressDialogRef.current) {
        closingProgressDialogRef.current = false;
        setShowProgressDialog(false);
        return;
      }

      if (pendingProgress) {
        setShowProgressDialog(true);
        return;
      }
    }

    setShowProgressDialog(open);
  };

  // 初始化会话
  useEffect(() => {
    const newSession: AssessmentSession = {
      id: sessionId,
      type: assessmentType,
      demographics: {} as Demographics,
      responses: [],
      startTime: new Date(),
      completed: false
    };
    setSession(newSession);
  }, [sessionId, assessmentType]);

  // 检测是否为未成年人
  const isMinorUser = demographics?.age === '0'; // 14-17岁年龄段

  // 处理知情同意
  const handleConsent = (consented: boolean) => {
    if (!consented) {
      navigate('/');
      return;
    }
    setCurrentStep('demographics');
    // 滚动到顶部以显示完整的人口学信息表单
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 处理人口学信息提交
  const handleDemographicsSubmit = (demographicsData: Demographics) => {
    setDemographics(demographicsData);
    if (session) {
      const updatedSession = {
        ...session,
        demographics: demographicsData
      };
      setSession(updatedSession);
      saveAssessmentSession(updatedSession);
    }
    setCurrentStep('questionnaire');
    // 滚动到顶部以显示问卷开始部分
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 处理问卷回答更新
  const handleResponseUpdate = (newResponses: Response[]) => {
    setResponses(newResponses);
    if (session) {
      const updatedSession = {
        ...session,
        responses: newResponses
      };
      setSession(updatedSession);
      saveAssessmentSession(updatedSession);
    }
  };

  // 处理问卷完成
  const handleQuestionnaireComplete = async () => {
    if (!session || !demographics) return;

    setCurrentStep('processing');

    try {
      // 计算结果
      const results = calculateAssessmentResults(responses, sessionId);

      // 更新会话
      const completedSession: AssessmentSession = {
        ...session,
        responses,
        results,
        endTime: new Date(),
        completed: true
      };

      setSession(completedSession);
      saveAssessmentSession(completedSession);

      // 跳转到结果页面
      setTimeout(() => {
        navigate(`/results?sessionId=${sessionId}`);
      }, 2000);

    } catch (error) {
      console.error('Error calculating results:', error);
      alert(t('assessmentPage.calculation.error'));
      setCurrentStep('questionnaire');
    }
  };

  // 获取步骤进度
  const getStepProgress = () => {
    const steps = ['consent', 'demographics', 'questionnaire', 'processing'];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  // 返回上一步
  const handleBack = () => {
    switch (currentStep) {
      case 'demographics':
        setCurrentStep('consent');
        break;
      case 'questionnaire':
        setCurrentStep('demographics');
        break;
      default:
        navigate('/');
        return;
    }
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-psychology-calm via-white to-psychology-warm">
      <AlertDialog open={showProgressDialog} onOpenChange={handleProgressDialogOpenChange}>
        <AlertDialogContent className="max-w-[calc(100%-2rem)] sm:max-w-sm rounded-xl p-6 space-y-6">
          <AlertDialogHeader className="space-y-3 text-center">
            <AlertDialogTitle className="text-xl font-semibold">
              {t('assessmentPage.progress.title')}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground">
              {t('assessmentPage.progress.description', { count: pendingProgress?.responses.length ?? 0 })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-2">
            <AlertDialogCancel
              onClick={handleDiscardProgress}
              className="w-full sm:w-auto transition-transform hover:scale-[1.02]"
            >
              {t('assessmentPage.progress.button.restart')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleContinueProgress}
              className="w-full sm:w-auto bg-psychology-primary hover:bg-psychology-primary/90 transition-transform hover:scale-[1.02]"
            >
              {t('assessmentPage.progress.button.continue')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-muted">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground"
              >
                <Home className="w-4 h-4 mr-2" />
                {t('nav.home')}
              </Button>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-psychology-primary" />
                <span className="font-semibold text-psychology-primary">
                  {assessmentType === 'quick' ? t('assessment.quick.title') : t('assessment.full.title')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSwitcher variant="dropdown" size="sm" />
              {currentStep !== 'processing' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBack}
                  className="text-muted-foreground hidden sm:flex"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('nav.back')}
                </Button>
              )}
              {currentStep !== 'processing' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBack}
                  className="text-muted-foreground sm:hidden"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* 总体进度条 */}
          {currentStep !== 'consent' && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">{t('assessmentPage.progress.overall')}</span>
                <span className="text-sm font-medium">{Math.round(getStepProgress())}%</span>
              </div>
              <Progress value={getStepProgress()} className="h-2" />
            </div>
          )}
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="container mx-auto px-4 py-8">
        {/* 知情同意书 */}
        {currentStep === 'consent' && (
          <ConsentForm
            onConsent={handleConsent}
            isMinor={isMinorUser}
          />
        )}

        {/* 人口学信息表单 */}
        {currentStep === 'demographics' && (
          <DemographicsForm
            onSubmit={handleDemographicsSubmit}
            onBack={handleBack}
            initialData={demographics || undefined}
          />
        )}

        {/* 问卷主界面 */}
        {currentStep === 'questionnaire' && demographics && (
          <QuestionnaireSection
            type={assessmentType}
            demographics={demographics}
            responses={responses}
            onResponseUpdate={handleResponseUpdate}
            onComplete={handleQuestionnaireComplete}
            resumeToken={resumeToken}
            onBack={handleBack}
          />
        )}

        {/* 处理中状态 */}
        {currentStep === 'processing' && (
          <div className="max-w-2xl mx-auto text-center">
            <Card className="sri-card p-12">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-psychology-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-psychology-primary animate-pulse" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-psychology-primary mb-2">
                    {t('assessmentPage.progress.processing')}
                  </h2>
                  <p className="text-muted-foreground">
                    {t('assessmentPage.progress.description.processing')}
                  </p>
                </div>

                <div className="space-y-3">
                  <Progress value={100} className="h-2" />
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{t('assessmentPage.progress.algorithm')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{t('assessmentPage.progress.report')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{t('assessmentPage.progress.privacy')}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* 底部提示 */}
      {currentStep === 'questionnaire' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-muted p-3 sm:p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <span className="hidden sm:inline">{t('assessmentPage.data.safe')}</span>
                <span className="sm:hidden">{t('assessmentPage.data.mobile')}</span>
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {t('assessmentPage.answered', { count: responses.length })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
