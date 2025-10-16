/**
 * 适应性量表系统 - 根据用户年龄和性经验调整题目
 * 为未成年人和无性经验用户提供适合的评估内容
 */

import { Demographics, LIKERT_OPTIONS, Scale } from '@/types';
import i18n from '@/locales/i18n';

// 青少年性态度量表（适用于14-17岁）
export const TEEN_SEXUAL_ATTITUDES: Scale = {
  id: 'teen_sexual_attitudes',
  name: i18n.t('scales.teen.name'),
  description: i18n.t('scales.teen.description'),
  questions: [
    {
      id: 'tsa_1',
      text: i18n.t('scales.teen.question.1'),
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'tsa_2',
      text: i18n.t('scales.teen.question.2'),
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'tsa_3',
      text: i18n.t('scales.teen.question.3'),
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'tsa_4',
      text: i18n.t('scales.teen.question.4'),
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'tsa_5',
      text: i18n.t('scales.teen.question.5'),
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'tsa_6',
      text: i18n.t('scales.teen.question.6'),
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'tsa_7',
      text: i18n.t('scales.teen.question.7'),
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'tsa_8',
      text: i18n.t('scales.teen.question.8'),
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'tsa_9',
      text: i18n.t('scales.teen.question.9'),
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'tsa_10',
      text: i18n.t('scales.teen.question.10'),
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [10, 50]
  }
};

// 性认知量表（适用于无性经验用户）
export const SEXUAL_COGNITION: Scale = {
  id: 'sexual_cognition',
  name: i18n.t('scales.cognition.name'),
  description: i18n.t('scales.cognition.description'),
  questions: [
    {
      id: 'sc_1',
      text: i18n.t('scales.cognition.question.1'),
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sc_2',
      text: i18n.t('scales.cognition.question.2'),
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'sc_3',
      text: i18n.t('scales.cognition.question.3'),
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sc_4',
      text: i18n.t('scales.cognition.question.4'),
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sc_5',
      text: i18n.t('scales.cognition.question.5'),
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sc_6',
      text: i18n.t('scales.cognition.question.6'),
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sc_7',
      text: i18n.t('scales.cognition.question.7'),
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sc_8',
      text: i18n.t('scales.cognition.question.8'),
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sc_9',
      text: i18n.t('scales.cognition.question.9'),
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'sc_10',
      text: i18n.t('scales.cognition.question.10'),
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [10, 50]
  }
};

// 修改过的SIS/SES量表（移除具体性行为相关题目）
export const SIS_SES_ADAPTED: Scale = {
  id: 'sis_ses_adapted',
  name: i18n.t('scales.adapted.name'),
  description: i18n.t('scales.adapted.description'),
  questions: [
    {
      id: 'sisa_1',
      text: i18n.t('scales.adapted.question.1'),
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_2',
      text: i18n.t('scales.adapted.question.2'),
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_3',
      text: i18n.t('scales.adapted.question.3'),
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_4',
      text: i18n.t('scales.adapted.question.4'),
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_5',
      text: i18n.t('scales.adapted.question.5'),
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_6',
      text: i18n.t('scales.adapted.question.6'),
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_7',
      text: i18n.t('scales.adapted.question.7'),
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_8',
      text: i18n.t('scales.adapted.question.8'),
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [8, 40]
  }
};

/**
 * 根据用户特征确定适合的量表组合
 * @param demographics 用户人口学信息
 * @returns 适合的量表ID数组
 */
export function getAdaptiveScales(demographics: Demographics): string[] {
  const ageValue = parseInt(demographics.age);
  const sexualActivity = parseInt(demographics.sexualActivity);

  // 14-17岁未成年人
  if (ageValue === 0) {
    return [
      'teen_sexual_attitudes',  // 10题
      'sexual_cognition',       // 10题
      'sis_ses_adapted',        // 8题
      'sos_screening'           // 5题 (保持原有)
    ]; // 总计 33题
  }

  // 无性经验的成年人
  if (sexualActivity === 0) {
    return [
      'sexual_cognition',       // 10题
      'sis_ses_adapted',        // 8题
      'mosher_guilt',           // 10题 (简化版)
      'kiss9_shame',            // 9题
      'sos_screening'           // 5题
    ]; // 总计 42题
  }

  // 有性经验但活跃度低的用户
  if (sexualActivity === 1) {
    return [
      'sis_ses_sf',             // 14题
      'mosher_guilt',           // 10题
      'kiss9_shame',            // 9题
      'sos_screening'           // 5题
    ]; // 总计 38题
  }

  // 默认标准量表（有一定性经验的用户）
  return [
    'sis_ses_sf',               // 14题
    'mosher_guilt',             // 10题
    'kiss9_shame',              // 9题
    'sos_screening'             // 5题
  ]; // 总计 38题
}

/**
 * 获取适应性量表的完整版配置
 * @param demographics 用户人口学信息
 * @returns 完整版量表ID数组
 */
export function getAdaptiveFullScales(demographics: Demographics): string[] {
  const ageValue = parseInt(demographics.age);
  const sexualActivity = parseInt(demographics.sexualActivity);

  // 14-17岁未成年人 - 扩展版但仍适合年龄
  if (ageValue === 0) {
    return [
      'teen_sexual_attitudes',  // 10题
      'sexual_cognition',       // 10题
      'sis_ses_adapted',        // 8题
      'sos_full',               // 21题 (完整版)
      'kiss9_shame'             // 9题
    ]; // 总计 58题
  }

  // 无性经验的成年人 - 适应版完整套装
  if (sexualActivity === 0) {
    return [
      'sexual_cognition',       // 10题
      'sis_ses_adapted',        // 8题
      'mosher_guilt_full',      // 28题
      'kiss9_shame',            // 9题
      'sos_full',               // 21题
      'bsas_brief'              // 23题
    ]; // 总计 99题
  }

  // 默认完整版量表
  return [
    'sis_ses_full',             // 45题
    'mosher_guilt_full',        // 28题
    'kiss9_shame',              // 9题
    'sos_full',                 // 21题
    'bsas_brief'                // 23题
  ]; // 总计 126题
}

/**
 * 检查用户是否为未成年人
 * @param demographics 用户人口学信息
 * @returns 是否为未成年人
 */
export function isMinor(demographics: Demographics): boolean {
  return parseInt(demographics.age) === 0; // age值为0代表14-17岁
}

/**
 * 检查用户是否无性经验
 * @param demographics 用户人口学信息
 * @returns 是否无性经验
 */
export function isInexperienced(demographics: Demographics): boolean {
  return parseInt(demographics.sexualActivity) === 0; // sexualActivity值为0代表从未有过性行为
}

/**
 * 获取用户群体的描述
 * @param demographics 用户人口学信息
 * @returns 用户群体描述
 */
export function getUserGroupDescription(demographics: Demographics): string {
  if (isMinor(demographics)) {
    return i18n.t('scales.group.teen');
  }

  if (isInexperienced(demographics)) {
    return i18n.t('scales.group.inexperienced');
  }

  const sexualActivity = parseInt(demographics.sexualActivity);
  if (sexualActivity === 1) {
    return i18n.t('scales.group.low');
  }

  return i18n.t('scales.group.standard');
}