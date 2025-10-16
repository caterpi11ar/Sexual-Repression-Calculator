/**
 * 结果页面 - 显示SRI指数计算结果和详细分析
 * 提供专业的心理测评结果展示和个性化建议
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  AlertCircle,
  BarChart3,
  Brain,
  CheckCircle,
  Clock,
  Download,
  Home,
  Info,
  RefreshCw,
  Shield,
  TrendingUp
} from 'lucide-react';
import { AssessmentSession, SRI_LEVELS } from '@/types';
import { diagnoseStorage, downloadAsJSON, getAssessmentSession } from '@/lib/storage';
import { ALL_SCALES } from '@/lib/scales';
import { ShareButtonMobile, ShareResult, SocialShareFloating } from '@/components/common';
import { useIsMobile } from '@/hooks/use-mobile';
import { decodeShareData } from '@/lib/share-utils';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function Results() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // 支持多种参数名称以提高兼容性
  const sessionId = searchParams.get('sessionId') || searchParams.get('session') || searchParams.get('id');
  const isShared = searchParams.get('shared') === 'true'; // 检测是否为分享链接
  const shareData = searchParams.get('data'); // 分享数据
  const isMobile = useIsMobile();

  const [session, setSession] = useState<AssessmentSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 加载会话数据
  useEffect(() => {
    // 如果是分享链接，尝试从URL参数解码数据
    if (isShared && shareData) {
      try {
        const decoded = decodeShareData(shareData);
        if (decoded) {
          // 创建虚拟的session对象用于显示
          const virtualSession: AssessmentSession = {
            id: 'shared-session',
            type: decoded.type as 'quick' | 'full',
            demographics: {
              age: '',
              gender: '',
              relationshipStatus: '',
              sexualActivity: '',
              consentToParticipate: true
            },
            responses: [],
            results: {
              sessionId: 'shared-session',
              sri: {
                totalScore: decoded.sri.totalScore || 0,
                zScore: 0,
                percentile: 0,
                level: decoded.sri.level as keyof typeof SRI_LEVELS,
                dimensionScores: decoded.sri.dimensionScores || {
                  sosReversed: 0,
                  sexGuilt: 0,
                  sexualShame: 0,
                  sisOverSes: 0
                },
                scaleScores: []
              },
              interpretation: [t('results.share.virtual.interpretation')],
              recommendations: [t('results.share.virtual.recommendation')],
              calculatedAt: new Date(decoded.completedAt)
            },
            startTime: new Date(decoded.completedAt),
            endTime: new Date(decoded.completedAt),
            completed: true
          };

          setSession(virtualSession);
          setLoading(false);
          return;
        } else {
          setError(t('results.error.share_invalid'));
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error('Error decoding share data:', err);
        setError(t('results.error.share_decode'));
        setLoading(false);
        return;
      }
    }

    // 普通会话ID加载
    if (!sessionId) {
      console.log('URL parameters:', Object.fromEntries(searchParams.entries()));
      // 运行存储诊断
      const diagnosis = diagnoseStorage();
      console.log('Storage diagnosis:', diagnosis);
      setError(t('results.error.no_session_id'));
      setLoading(false);
      return;
    }

    console.log('Loading session with ID:', sessionId);
    // 运行存储诊断
    const diagnosis = diagnoseStorage();
    console.log('Storage diagnosis:', diagnosis);

    try {
      const assessmentSession = getAssessmentSession(sessionId);
      console.log('Found session:', assessmentSession ? 'Yes' : 'No');

      if (!assessmentSession) {
        setError(t('results.error.session_not_found', { sessionId }));
        setLoading(false);
        return;
      }

      if (!assessmentSession.results) {
        setError(t('results.error.not_completed'));
        setLoading(false);
        return;
      }

      console.log('Session loaded successfully');
      setSession(assessmentSession);
    } catch (err) {
      console.error('Error loading session:', err);
      const errorMessage = err instanceof Error ? err.message : t('results.error.load_failed', { error: 'Unknown error' });
      setError(t('results.error.load_failed', { error: errorMessage }));
    } finally {
      setLoading(false);
    }
  }, [sessionId, isShared, shareData, searchParams, t]);

  // 下载结果
  const handleDownload = () => {
    if (!session || !sessionId) return;

    const exportData = {
      sessionId: session.id,
      timestamp: new Date().toISOString(),
      type: session.type,
      demographics: session.demographics,
      results: session.results,
      responses: session.responses.reduce((acc, response) => {
        acc[response.questionId] = response.value;
        return acc;
      }, {} as Record<string, number>)
    };

    downloadAsJSON(exportData, `SRI_Results_${new Date().toISOString().split('T')[0]}.json`);
  };

  // 重新测评
  const handleRetake = () => {
    navigate(`/assessment?type=${session?.type || 'quick'}`);
  };

  // 获取等级信息
  const getLevelInfo = (level: keyof typeof SRI_LEVELS) => {
    return SRI_LEVELS[level];
  };

  // 获取等级颜色类
  const getLevelColorClass = (level: keyof typeof SRI_LEVELS) => {
    switch (level) {
      case 'very-low':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'very-high':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-psychology-calm via-white to-psychology-warm flex items-center justify-center">
        <Card className="w-full max-w-md p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-psychology-primary/10 rounded-full flex items-center justify-center mx-auto">
              <RefreshCw className="w-8 h-8 text-psychology-primary animate-spin" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">{t('results.loading.title')}</h2>
              <p className="text-muted-foreground">{t('results.loading.description')}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (error || !session || !session.results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-psychology-calm via-white to-psychology-warm flex items-center justify-center p-4">
        <Card className="w-full max-w-lg p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-red-600">{t('results.error.title')}</h2>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {error || t('results.error.not_found')}
              </p>

              {/* 调试信息（开发环境） */}
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-gray-50 p-3 rounded-lg text-left text-xs text-gray-600 mb-4">
                  <div><strong>{t('results.debug.title')}</strong></div>
                  <div>{t('results.debug.session_id', { sessionId: sessionId || 'None' })}</div>
                  <div>{t('results.debug.url_params', { params: JSON.stringify(Object.fromEntries(searchParams.entries())) })}</div>
                  <div>{t('results.debug.has_session', { hasSession: session ? 'Yes' : 'No' })}</div>
                  <div>{t('results.debug.has_results', { hasResults: session?.results ? 'Yes' : 'No' })}</div>
                </div>
              )}

              {/* 解决建议 */}
              <div className="bg-blue-50 p-4 rounded-lg mb-4 text-left">
                <h3 className="font-semibold text-blue-800 mb-2">{t('results.solutions.title')}</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• {t('results.solutions.1')}</li>
                  <li>• {t('results.solutions.2')}</li>
                  <li>• {t('results.solutions.3')}</li>
                  <li>• {t('results.solutions.4')}</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" onClick={() => navigate('/history')}>
                  <Clock className="w-4 h-4 mr-2" />
                  {t('results.actions.history')}
                </Button>
                <Button variant="outline" onClick={() => navigate('/')}>
                  <Home className="w-4 h-4 mr-2" />
                  {t('results.actions.back')}
                </Button>
                <Button onClick={() => navigate('/assessment')}>
                  <Brain className="w-4 h-4 mr-2" />
                  {t('results.retake')}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const sri = session.results.sri;
  const levelInfo = getLevelInfo(sri.level);

  return (
    <div className="min-h-screen bg-gradient-to-br from-psychology-calm via-white to-psychology-warm">
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
                  {t('results.nav.title')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* 语言切换器 */}
              <LanguageSwitcher variant="dropdown" size="sm" />
              
              {/* 分享按钮 */}
              {isMobile ? (
                <ShareButtonMobile session={session} />
              ) : (
                <ShareResult session={session} />
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="text-muted-foreground hidden sm:flex"
              >
                <Download className="w-4 h-4 mr-2" />
                {t('results.download')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="text-muted-foreground sm:hidden"
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetake}
                className="text-muted-foreground hidden sm:flex"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {t('results.retake')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetake}
                className="text-muted-foreground sm:hidden"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* 主要结果卡片 */}
        <Card className="sri-card border-2 border-psychology-primary/20">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-psychology-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-10 h-10 text-psychology-primary" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-psychology-primary mb-2">
              {t('results.sri.title')}
            </CardTitle>
            <div className="text-4xl sm:text-6xl font-bold text-psychology-primary mb-4">
              {Math.round(sri.totalScore)}
            </div>
            <Badge
              className={`text-lg flex justify-center px-6 py-2 ${getLevelColorClass(sri.level)}`}
              variant="outline"
            >
              {levelInfo.label}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 分数解释 */}
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                {t('results.sri.description', { score: Math.round(sri.totalScore), level: levelInfo.label })}
              </p>
              <div className="max-w-2xl mx-auto">
                <Progress value={sri.totalScore} className="h-3 mb-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{t('results.sri.scale.0')}</span>
                  <span>{t('results.sri.scale.50')}</span>
                  <span>{t('results.sri.scale.100')}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* 结果解释 */}
            {session.results.interpretation && session.results.interpretation.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-psychology-primary" />
                  {t('results.interpretation.title')}
                </h3>
                <div className="space-y-2">
                  {session.results.interpretation.map((text, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* 个性化建议 */}
            {session.results.recommendations && session.results.recommendations.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-psychology-primary" />
                  {t('results.recommendations.title')}
                </h3>
                <div className="space-y-2">
                  {session.results.recommendations.map((text, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 四维度分析 */}
        <Card className="sri-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-psychology-primary" />
              {t('results.dimensions.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className='font-medium'>{t('results.dimensions.sos')}</span>
                    <span className="text-sm text-muted-foreground">
                      {sri.dimensionScores.sosReversed.toFixed(2)}
                    </span>
                  </div>
                  <Progress value={Math.abs(sri.dimensionScores.sosReversed) * 20} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className='font-medium'>{t('results.dimensions.guilt')}</span>
                    <span className="text-sm text-muted-foreground">
                      {sri.dimensionScores.sexGuilt.toFixed(2)}
                    </span>
                  </div>
                  <Progress value={Math.abs(sri.dimensionScores.sexGuilt) * 20} className="h-2" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className='font-medium'>{t('results.dimensions.shame')}</span>
                    <span className="text-sm text-muted-foreground">
                      {sri.dimensionScores.sexualShame.toFixed(2)}
                    </span>
                  </div>
                  <Progress value={Math.abs(sri.dimensionScores.sexualShame) * 20} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className='font-medium'>{t('results.dimensions.sis_ses')}</span>
                    <span className="text-sm text-muted-foreground">
                      {sri.dimensionScores.sisOverSes.toFixed(2)}
                    </span>
                  </div>
                  <Progress value={Math.abs(sri.dimensionScores.sisOverSes) * 20} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 量表分数详情 */}
        <Card className="sri-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-psychology-primary" />
              {t('results.details.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sri.scaleScores.map((score) => {
                const scale = ALL_SCALES[score.scaleId];
                if (!scale) return null;

                return (
                  <div key={score.scaleId} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-medium">{scale.name}</h4>
                      <p className="text-sm text-muted-foreground">{scale.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">{score.rawScore}</div>
                      <div className="text-xs text-muted-foreground">z: {score.zScore.toFixed(2)}</div>
                      <div className='text-xs text-muted-foreground'>{t('results.details.percentile', { percentile: score.percentile.toFixed(0) })}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* 评估信息 */}
        <Card className="sri-card">
          <CardHeader>
            <CardTitle className='text-lg'>{t('results.info.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">{t('results.info.type')}</span>
                <span className="ml-2 font-medium">
                  {session.type === 'quick' ? t('results.info.type.quick') : t('results.info.type.full')}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">{t('results.info.completed')}</span>
                <span className="ml-2 font-medium">
                  {session.endTime ? new Date(session.endTime).toLocaleString() : t('results.info.unknown')}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">{t('results.info.questions')}</span>
                <span className="ml-2 font-medium">{t('results.info.questions_count', { count: session.responses.length })}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{t('results.info.session_id')}</span>
                <span className="ml-2 font-mono text-xs">{session.id}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 重要声明 */}
        <Card className="sri-card border-yellow-200 bg-yellow-50/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2 text-sm">
                <h4 className="font-semibold text-yellow-800">{t('results.disclaimer.title')}</h4>
                <p className="text-yellow-700 leading-relaxed">
                  {t('results.disclaimer.content1')}
                </p>
                <p className="text-yellow-700 leading-relaxed">
                  {t('results.disclaimer.content2')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 分享提示（仅在分享链接访问时显示） */}
        {isShared && (
          <Card className="sri-card border-psychology-primary/30 bg-psychology-primary/5">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-psychology-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-psychology-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-psychology-primary mb-2">
                    {t('results.share.title')}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t('results.share.description')}
                  </p>
                  <div className="flex justify-center gap-3">
                    <Button
                      onClick={() => navigate('/assessment')}
                      className="bg-psychology-primary hover:bg-psychology-primary/90"
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      {t('results.share.start')}
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/')}>
                      <Home className="w-4 h-4 mr-2" />
                      {t('results.share.learn')}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 操作按钮 */}
        <div className="flex justify-center gap-4 pt-6">
          <Button variant="outline" onClick={() => navigate('/')}>
            <Home className="w-4 h-4 mr-2" />
            {t('results.actions.back')}
          </Button>
          {!isShared && (
            <Button onClick={handleRetake} className="bg-psychology-primary hover:bg-psychology-primary/90">
              <RefreshCw className="w-4 h-4 mr-2" />
              {t('results.retake')}
            </Button>
          )}

          {/* 大尺寸分享按钮（桌面端） */}
          {!isMobile && !isShared && (
            <ShareResult
              session={session}
              className="bg-psychology-accent hover:bg-psychology-accent/90 text-white border-psychology-accent"
            />
          )}
        </div>
      </main>

      {/* 移动端浮动分享按钮 */}
      {isMobile && !isShared && (
        <SocialShareFloating session={session} />
      )}
    </div>
  );
}