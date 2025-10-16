/**
 * 心理量表定义 - 基于科学文献的标准化量表
 * 包含SIS/SES-SF、Mosher性内疚、KISS-9性羞耻、SOS筛查版等
 */

import { FREQUENCY_OPTIONS, LIKERT_OPTIONS, Scale } from '@/types';
import { SEXUAL_COGNITION, SIS_SES_ADAPTED, TEEN_SEXUAL_ATTITUDES } from './adaptive-scales';
import i18n from '@/locales/i18n';

// SIS/SES-SF 14项量表 (Sexual Inhibition/Sexual Excitation Scale - Short Form)
export const SIS_SES_SF: Scale = {
  id: 'sis_ses_sf',
  name: i18n.t('scales.sis_ses_sf.name'),
  description: i18n.t('scales.sis_ses_sf.description'),
  questions: [
    // SES items (Sexual Excitation System)
    {
      id: 'ses_1',
      text: i18n.t('questions.sis_ses_sf.ses_1'),
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_2',
      text: i18n.t('questions.sis_ses_sf.ses_2'),
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_3',
      text: i18n.t('questions.sis_ses_sf.ses_3'),
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_4',
      text: i18n.t('questions.sis_ses_sf.ses_4'),
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    // SIS1 items (性能表现相关抑制)
    {
      id: 'sis1_1',
      text: i18n.t('questions.sis_ses_sf.sis1_1'),
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_2',
      text: i18n.t('questions.sis_ses_sf.sis1_2'),
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_3',
      text: i18n.t('questions.sis_ses_sf.sis1_3'),
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_4',
      text: i18n.t('questions.sis_ses_sf.sis1_4'),
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_5',
      text: i18n.t('questions.sis_ses_sf.sis1_5'),
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    // SIS2 items (威胁/恐惧相关抑制)
    {
      id: 'sis2_1',
      text: i18n.t('questions.sis_ses_sf.sis2_1'),
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_2',
      text: i18n.t('questions.sis_ses_sf.sis2_2'),
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_3',
      text: i18n.t('questions.sis_ses_sf.sis2_3'),
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_4',
      text: i18n.t('questions.sis_ses_sf.sis2_4'),
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_5',
      text: i18n.t('questions.sis_ses_sf.sis2_5'),
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [14, 70]
  }
};

// Mosher性内疚量表10项简版
export const MOSHER_GUILT: Scale = {
  id: 'mosher_guilt',
  name: i18n.t('scales.mosher.name'),
  description: i18n.t('scales.mosher.description'),
  questions: [
    {
      id: 'mg_1',
      text: i18n.t('questions.mosher_guilt.mg_1'),
      scale: 'mosher_guilt',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_2',
      text: i18n.t('questions.mosher_guilt.mg_2'),
      scale: 'mosher_guilt',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_3',
      text: i18n.t('questions.mosher_guilt.mg_3'),
      scale: 'mosher_guilt',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_4',
      text: i18n.t('questions.mosher_guilt.mg_4'),
      scale: 'mosher_guilt',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_5',
      text: i18n.t('questions.mosher_guilt.mg_5'),
      scale: 'mosher_guilt',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_6',
      text: i18n.t('questions.mosher_guilt.mg_6'),
      scale: 'mosher_guilt',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_7',
      text: i18n.t('questions.mosher_guilt.mg_7'),
      scale: 'mosher_guilt',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_8',
      text: i18n.t('questions.mosher_guilt.mg_8'),
      scale: 'mosher_guilt',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_9',
      text: i18n.t('questions.mosher_guilt.mg_9'),
      scale: 'mosher_guilt',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_10',
      text: i18n.t('questions.mosher_guilt.mg_10'),
      scale: 'mosher_guilt',
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

// KISS-9性羞耻量表
export const KISS9_SHAME: Scale = {
  id: 'kiss9_shame',
  name: i18n.t('scales.kiss9.name'),
  description: i18n.t('scales.kiss9.description'),
  questions: [
    {
      id: 'ks_1',
      text: i18n.t('questions.kiss9_shame.ks_1'),
      scale: 'kiss9_shame',
      type: 'likert',
      options: Object.values(FREQUENCY_OPTIONS),
      required: true
    },
    {
      id: 'ks_2',
      text: i18n.t('questions.kiss9_shame.ks_2'),
      scale: 'kiss9_shame',
      type: 'likert',
      options: Object.values(FREQUENCY_OPTIONS),
      required: true
    },
    {
      id: 'ks_3',
      text: i18n.t('questions.kiss9_shame.ks_3'),
      scale: 'kiss9_shame',
      type: 'likert',
      options: Object.values(FREQUENCY_OPTIONS),
      required: true
    },
    {
      id: 'ks_4',
      text: i18n.t('questions.kiss9_shame.ks_4'),
      scale: 'kiss9_shame',
      type: 'likert',
      options: Object.values(FREQUENCY_OPTIONS),
      required: true
    },
    {
      id: 'ks_5',
      text: i18n.t('questions.kiss9_shame.ks_5'),
      scale: 'kiss9_shame',
      type: 'likert',
      options: Object.values(FREQUENCY_OPTIONS),
      required: true
    },
    {
      id: 'ks_6',
      text: i18n.t('questions.kiss9_shame.ks_6'),
      scale: 'kiss9_shame',
      type: 'likert',
      options: Object.values(FREQUENCY_OPTIONS),
      required: true
    },
    {
      id: 'ks_7',
      text: i18n.t('questions.kiss9_shame.ks_7'),
      scale: 'kiss9_shame',
      type: 'likert',
      options: Object.values(FREQUENCY_OPTIONS),
      required: true
    },
    {
      id: 'ks_8',
      text: i18n.t('questions.kiss9_shame.ks_8'),
      scale: 'kiss9_shame',
      type: 'likert',
      options: Object.values(FREQUENCY_OPTIONS),
      required: true
    },
    {
      id: 'ks_9',
      text: i18n.t('questions.kiss9_shame.ks_9'),
      scale: 'kiss9_shame',
      type: 'likert',
      options: Object.values(FREQUENCY_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [9, 45]
  }
};

// SOS筛查版（简化版本）
export const SOS_SCREENING: Scale = {
  id: 'sos_screening',
  name: i18n.t('scales.sos_screening.name'),
  description: i18n.t('scales.sos_screening.description'),
  questions: [
    {
      id: 'sos_1',
      text: i18n.t('questions.sos_screening.sos_1'),
      scale: 'sos_screening',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_2',
      text: i18n.t('questions.sos_screening.sos_2'),
      scale: 'sos_screening',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_3',
      text: i18n.t('questions.sos_screening.sos_3'),
      scale: 'sos_screening',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_4',
      text: i18n.t('questions.sos_screening.sos_4'),
      scale: 'sos_screening',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_5',
      text: i18n.t('questions.sos_screening.sos_5'),
      scale: 'sos_screening',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [5, 25]
  }
};

// SIS/SES完整版量表 (45项)
export const SIS_SES_FULL: Scale = {
  id: 'sis_ses_full',
  name: i18n.t('scales.sis_ses_full.name'),
  description: i18n.t('scales.sis_ses_full.description'),
  questions: [
    // SES items (Sexual Excitation System) - 16项
    ...SIS_SES_SF.questions.filter(q => q.id.startsWith('ses_')),
    {
      id: 'ses_5',
      text: i18n.t('questions.sis_ses_full.ses_5'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_6',
      text: i18n.t('questions.sis_ses_full.ses_6'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_7',
      text: i18n.t('questions.sis_ses_full.ses_7'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_8',
      text: i18n.t('questions.sis_ses_full.ses_8'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_9',
      text: i18n.t('questions.sis_ses_full.ses_9'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_10',
      text: i18n.t('questions.sis_ses_full.ses_10'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_11',
      text: i18n.t('questions.sis_ses_full.ses_11'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_12',
      text: i18n.t('questions.sis_ses_full.ses_12'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_13',
      text: i18n.t('questions.sis_ses_full.ses_13'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_14',
      text: i18n.t('questions.sis_ses_full.ses_14'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_15',
      text: i18n.t('questions.sis_ses_full.ses_15'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_16',
      text: i18n.t('questions.sis_ses_full.ses_16'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    // SIS1 items 完整版 - 14项
    ...SIS_SES_SF.questions.filter(q => q.id.startsWith('sis1_')),
    {
      id: 'sis1_6',
      text: i18n.t('questions.sis_ses_full.sis1_6'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_7',
      text: i18n.t('questions.sis_ses_full.sis1_7'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_8',
      text: i18n.t('questions.sis_ses_full.sis1_8'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_9',
      text: i18n.t('questions.sis_ses_full.sis1_9'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_10',
      text: i18n.t('questions.sis_ses_full.sis1_10'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_11',
      text: i18n.t('questions.sis_ses_full.sis1_11'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_12',
      text: i18n.t('questions.sis_ses_full.sis1_12'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_13',
      text: i18n.t('questions.sis_ses_full.sis1_13'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_14',
      text: i18n.t('questions.sis_ses_full.sis1_14'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    // SIS2 items 完整版 - 15项
    ...SIS_SES_SF.questions.filter(q => q.id.startsWith('sis2_')),
    {
      id: 'sis2_6',
      text: i18n.t('questions.sis_ses_full.sis2_6'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_7',
      text: i18n.t('questions.sis_ses_full.sis2_7'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_8',
      text: i18n.t('questions.sis_ses_full.sis2_8'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_9',
      text: i18n.t('questions.sis_ses_full.sis2_9'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_10',
      text: i18n.t('questions.sis_ses_full.sis2_10'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_11',
      text: i18n.t('questions.sis_ses_full.sis2_11'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_12',
      text: i18n.t('questions.sis_ses_full.sis2_12'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_13',
      text: i18n.t('questions.sis_ses_full.sis2_13'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_14',
      text: i18n.t('questions.sis_ses_full.sis2_14'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_15',
      text: i18n.t('questions.sis_ses_full.sis2_15'),
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [45, 225]
  }
};

// Mosher性内疚量表完整版 (28项)
export const MOSHER_GUILT_FULL: Scale = {
  id: 'mosher_guilt_full',
  name: i18n.t('scales.mosher_full.name'),
  description: i18n.t('scales.mosher_full.description'),
  questions: [
    // 已有的10项
    ...MOSHER_GUILT.questions,
    // 新增的18项
    {
      id: 'mg_11',
      text: i18n.t('questions.mosher_guilt_full.mg_11'),
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_12',
      text: i18n.t('questions.mosher_guilt_full.mg_12'),
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_13',
      text: i18n.t('questions.mosher_guilt_full.mg_13'),
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_14',
      text: i18n.t('questions.mosher_guilt_full.mg_14'),
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_15',
      text: i18n.t('questions.mosher_guilt_full.mg_15'),
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_16',
      text: i18n.t('questions.mosher_guilt_full.mg_16'),
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_17',
      text: i18n.t('questions.mosher_guilt_full.mg_17'),
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_18',
      text: i18n.t('questions.mosher_guilt_full.mg_18'),
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_19',
      text: i18n.t('questions.mosher_guilt_full.mg_19'),
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_20',
      text: i18n.t('questions.mosher_guilt_full.mg_20'),
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_21',
      text: i18n.t('questions.mosher_guilt_full.mg_21'),
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_22',
      text: i18n.t('questions.mosher_guilt_full.mg_22'),
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_23',
      text: i18n.t('questions.mosher_guilt_full.mg_23'),
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_24',
      text: i18n.t('questions.mosher_guilt_full.mg_24'),
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_25',
      text: i18n.t('questions.mosher_guilt_full.mg_25'),
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_26',
      text: i18n.t('questions.mosher_guilt_full.mg_26'),
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_27',
      text: i18n.t('questions.mosher_guilt_full.mg_27'),
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_28',
      text: i18n.t('questions.mosher_guilt_full.mg_28'),
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [28, 140]
  }
};

// SOS性观感完整版量表 (21项)
export const SOS_FULL: Scale = {
  id: 'sos_full',
  name: i18n.t('scales.sos_full.name'),
  description: i18n.t('scales.sos_full.description'),
  questions: [
    // 已有的5项筛查版题目
    ...SOS_SCREENING.questions,
    // 新增的16项
    {
      id: 'sos_6',
      text: i18n.t('questions.sos_full.sos_6'),
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_7',
      text: i18n.t('questions.sos_full.sos_7'),
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_8',
      text: i18n.t('questions.sos_full.sos_8'),
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_9',
      text: i18n.t('questions.sos_full.sos_9'),
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_10',
      text: i18n.t('questions.sos_full.sos_10'),
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_11',
      text: i18n.t('questions.sos_full.sos_11'),
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_12',
      text: i18n.t('questions.sos_full.sos_12'),
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_13',
      text: i18n.t('questions.sos_full.sos_13'),
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_14',
      text: i18n.t('questions.sos_full.sos_14'),
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_15',
      text: i18n.t('questions.sos_full.sos_15'),
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_16',
      text: i18n.t('questions.sos_full.sos_16'),
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_17',
      text: i18n.t('questions.sos_full.sos_17'),
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_18',
      text: i18n.t('questions.sos_full.sos_18'),
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_19',
      text: i18n.t('questions.sos_full.sos_19'),
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_20',
      text: i18n.t('questions.sos_full.sos_20'),
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_21',
      text: i18n.t('questions.sos_full.sos_21'),
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [21, 105]
  }
};

// BSAS简版性态度量表 (23项)
export const BSAS_BRIEF: Scale = {
  id: 'bsas_brief',
  name: i18n.t('scales.bsas.name'),
  description: i18n.t('scales.bsas.description'),
  questions: [
    // 性许可性维度 (6项)
    {
      id: 'bsas_perm_1',
      text: i18n.t('questions.bsas_brief.bsas_perm_1'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_perm_2',
      text: i18n.t('questions.bsas_brief.bsas_perm_2'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_perm_3',
      text: i18n.t('questions.bsas_brief.bsas_perm_3'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_perm_4',
      text: i18n.t('questions.bsas_brief.bsas_perm_4'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_perm_5',
      text: i18n.t('questions.bsas_brief.bsas_perm_5'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'bsas_perm_6',
      text: i18n.t('questions.bsas_brief.bsas_perm_6'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    // 性出生控制维度 (6项)
    {
      id: 'bsas_birth_1',
      text: i18n.t('questions.bsas_brief.bsas_birth_1'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_birth_2',
      text: i18n.t('questions.bsas_brief.bsas_birth_2'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'bsas_birth_3',
      text: i18n.t('questions.bsas_brief.bsas_birth_3'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'bsas_birth_4',
      text: i18n.t('questions.bsas_brief.bsas_birth_4'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_birth_5',
      text: i18n.t('questions.bsas_brief.bsas_birth_5'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_birth_6',
      text: i18n.t('questions.bsas_brief.bsas_birth_6'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    // 性交际维度 (5项)
    {
      id: 'bsas_comm_1',
      text: i18n.t('questions.bsas_brief.bsas_comm_1'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'bsas_comm_2',
      text: i18n.t('questions.bsas_brief.bsas_comm_2'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_comm_3',
      text: i18n.t('questions.bsas_brief.bsas_comm_3'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'bsas_comm_4',
      text: i18n.t('questions.bsas_brief.bsas_comm_4'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_comm_5',
      text: i18n.t('questions.bsas_brief.bsas_comm_5'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    // 性工具性维度 (6项)
    {
      id: 'bsas_inst_1',
      text: i18n.t('questions.bsas_brief.bsas_inst_1'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_inst_2',
      text: i18n.t('questions.bsas_brief.bsas_inst_2'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_inst_3',
      text: i18n.t('questions.bsas_brief.bsas_inst_3'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_inst_4',
      text: i18n.t('questions.bsas_brief.bsas_inst_4'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_inst_5',
      text: i18n.t('questions.bsas_brief.bsas_inst_5'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'bsas_inst_6',
      text: i18n.t('questions.bsas_brief.bsas_inst_6'),
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [23, 115]
  }
};

// 人口学信息表单
export const DEMOGRAPHICS_QUESTIONS = [
  {
    id: 'age',
    text: i18n.t('demographics.age'),
    type: 'multiple',
    options: [
      { value: 0, label: i18n.t('demographics.ageOptions.14_17') },
      { value: 1, label: i18n.t('demographics.ageOptions.18_24') },
      { value: 2, label: i18n.t('demographics.ageOptions.25_34') },
      { value: 3, label: i18n.t('demographics.ageOptions.35_44') },
      { value: 4, label: i18n.t('demographics.ageOptions.45_54') },
      { value: 5, label: i18n.t('demographics.ageOptions.55_plus') }
    ],
    required: true
  },
  {
    id: 'gender',
    text: i18n.t('demographics.gender'),
    type: 'multiple',
    options: [
      { value: 1, label: i18n.t('demographics.genderOptions.male') },
      { value: 2, label: i18n.t('demographics.genderOptions.female') },
      { value: 3, label: i18n.t('demographics.genderOptions.non_binary') },
      { value: 4, label: i18n.t('demographics.genderOptions.prefer_not_to_say') }
    ],
    required: true
  },
  {
    id: 'relationshipStatus',
    text: i18n.t('demographics.relationshipStatus'),
    type: 'multiple',
    options: [
      { value: 1, label: i18n.t('demographics.relationshipOptions.single') },
      { value: 2, label: i18n.t('demographics.relationshipOptions.dating') },
      { value: 3, label: i18n.t('demographics.relationshipOptions.married') },
      { value: 4, label: i18n.t('demographics.relationshipOptions.prefer_not_to_say') }
    ],
    required: true
  },
  {
    id: 'sexualActivity',
    text: i18n.t('demographics.sexualActivity'),
    type: 'multiple',
    options: [
      { value: 0, label: i18n.t('demographics.sexualActivityOptions.never') },
      { value: 1, label: i18n.t('demographics.sexualActivityOptions.past_year_none') },
      { value: 2, label: i18n.t('demographics.sexualActivityOptions.rarely') },
      { value: 3, label: i18n.t('demographics.sexualActivityOptions.occasionally') },
      { value: 4, label: i18n.t('demographics.sexualActivityOptions.regularly') },
      { value: 5, label: i18n.t('demographics.sexualActivityOptions.frequently') }
    ],
    required: true
  },
  {
    id: 'religiousCultural',
    text: i18n.t('demographics.religiousCultural'),
    type: 'multiple',
    options: [
      { value: 1, label: i18n.t('demographics.religiousOptions.none') },
      { value: 2, label: i18n.t('demographics.religiousOptions.christianity') },
      { value: 3, label: i18n.t('demographics.religiousOptions.buddhism') },
      { value: 4, label: i18n.t('demographics.religiousOptions.islam') },
      { value: 5, label: i18n.t('demographics.religiousOptions.other') },
      { value: 6, label: i18n.t('demographics.religiousOptions.prefer_not_to_say') }
    ],
    required: false
  }
];

// 导入适应性量表
export * from './adaptive-scales';

// 所有量表的集合
export const ALL_SCALES = {
  [SIS_SES_SF.id]: SIS_SES_SF,
  [SIS_SES_FULL.id]: SIS_SES_FULL,
  [MOSHER_GUILT.id]: MOSHER_GUILT,
  [MOSHER_GUILT_FULL.id]: MOSHER_GUILT_FULL,
  [KISS9_SHAME.id]: KISS9_SHAME,
  [SOS_SCREENING.id]: SOS_SCREENING,
  [SOS_FULL.id]: SOS_FULL,
  [BSAS_BRIEF.id]: BSAS_BRIEF,
  // 适应性量表
  [TEEN_SEXUAL_ATTITUDES.id]: TEEN_SEXUAL_ATTITUDES,
  [SEXUAL_COGNITION.id]: SEXUAL_COGNITION,
  [SIS_SES_ADAPTED.id]: SIS_SES_ADAPTED
} as const;

// 快测版本使用的量表 (39项)
export const QUICK_ASSESSMENT_SCALES = [
  SIS_SES_SF.id,      // 14项
  MOSHER_GUILT.id,    // 10项
  KISS9_SHAME.id,     // 9项
  SOS_SCREENING.id    // 5项
];

// 完整版本使用的量表 (117项)
export const FULL_ASSESSMENT_SCALES = [
  SIS_SES_FULL.id,      // 45项
  MOSHER_GUILT_FULL.id, // 28项
  KISS9_SHAME.id,       // 9项 (保持不变，已经是完整版)
  SOS_FULL.id,          // 21项
  BSAS_BRIEF.id         // 23项
];