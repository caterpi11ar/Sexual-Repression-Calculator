/**
 * 分享工具函数 - 处理结果分享相关的逻辑
 * 包括分享文案生成、URL构建、社交媒体分享链接等
 */

import { AssessmentSession, SRI_LEVELS, SRIResult } from '@/types';
import { getAssessmentSession } from '@/lib/storage';
import i18n from '@/locales/i18n';

/**
 * 生成分享文案
 * @param session 评估会话
 * @param t 翻译函数（可选）
 * @returns 分享文案
 */
export function generateShareText(session: AssessmentSession): string {
  if (!session.results) {
    return i18n.t('shareUtils.defaultText');
  }

  const sri = session.results.sri;
  const levelInfo = SRI_LEVELS[sri.level];
  const score = Math.round(sri.totalScore);

  const templates = {
    'very-low': [
      i18n.t('shareUtils.templates.veryLow.1', { score, level: levelInfo.label }),
      i18n.t('shareUtils.templates.veryLow.2', { score, level: levelInfo.label }),
      i18n.t('shareUtils.templates.veryLow.3', { score, level: levelInfo.label })
    ],
    'low': [
      i18n.t('shareUtils.templates.low.1', { score, level: levelInfo.label }),
      i18n.t('shareUtils.templates.low.2', { score, level: levelInfo.label }),
      i18n.t('shareUtils.templates.low.3', { score, level: levelInfo.label })
    ],
    'moderate': [
      i18n.t('shareUtils.templates.moderate.1', { score, level: levelInfo.label }),
      i18n.t('shareUtils.templates.moderate.2', { score, level: levelInfo.label }),
      i18n.t('shareUtils.templates.moderate.3', { score, level: levelInfo.label })
    ],
    'high': [
      i18n.t('shareUtils.templates.high.1', { score, level: levelInfo.label }),
      i18n.t('shareUtils.templates.high.2', { score, level: levelInfo.label }),
      i18n.t('shareUtils.templates.high.3', { score, level: levelInfo.label })
    ],
    'very-high': [
      i18n.t('shareUtils.templates.veryHigh.1', { score, level: levelInfo.label }),
      i18n.t('shareUtils.templates.veryHigh.2', { score, level: levelInfo.label }),
      i18n.t('shareUtils.templates.veryHigh.3', { score, level: levelInfo.label })
    ]
  };

  const levelTemplates = templates[sri.level];
  const randomTemplate = levelTemplates[Math.floor(Math.random() * levelTemplates.length)];

  return `${randomTemplate}\n\n${i18n.t('shareUtils.suffix')}`;
}

/**
 * 生成分享URL
 * @param sessionId 会话ID
 * @param t 翻译函数（可选）
 * @returns 分享URL
 */
export function generateShareUrl(sessionId: string): string {

  // 获取会话数据
  const session = getAssessmentSession(sessionId);
  if (!session || !session.results) {
    throw new Error(i18n.t('shareUtils.error.sessionNotFound'));
  }

  // 创建分享数据对象（只包含展示需要的数据）
  const shareData = {
    sri: {
      totalScore: session.results.sri.totalScore,
      level: session.results.sri.level,
      dimensionScores: session.results.sri.dimensionScores
    },
    type: session.type,
    completedAt: session.endTime?.toISOString() || new Date().toISOString()
  };

  // 将数据编码到URL中
  const encodedData = btoa(JSON.stringify(shareData));
  const baseUrl = window.location.origin;
  return `${baseUrl}/results?shared=true&data=${encodedData}`;
}

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      console.warn('Clipboard API failed, falling back to execCommand');
    }
  }

  // 回退方案
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch {
    throw new Error(i18n.t('calculator.error.copyFailed'));
  } finally {
    document.body.removeChild(textArea);
  }
}

/**
 * 生成二维码
 * @param text 要编码的文本
 * @returns Promise<string> 二维码图片URL
 */
export async function generateQRCode(text: string): Promise<string> {
  // 使用更安全的方式：直接返回第三方API URL，不进行Canvas处理
  const encodedText = encodeURIComponent(text);
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedText}`;

  // 简单验证API是否可用
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      // 直接返回API URL，避免Canvas污染问题
      resolve(qrApiUrl);
    };
    img.onerror = () => {
      // 如果API不可用，生成一个简单的文本二维码替代
      resolve(generateSimpleQRCode());
    };

    // 设置crossOrigin以避免CORS问题
    img.crossOrigin = 'anonymous';
    img.src = qrApiUrl;
  });
}

/**
 * 生成简单的二维码替代方案
 * @returns 简单二维码图片URL
 */
function generateSimpleQRCode(): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error(i18n.t('calculator.error.canvasFailed'));
  }

  // 设置画布尺寸
  canvas.width = 200;
  canvas.height = 200;

  // 绘制简单的二维码样式背景
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 绘制边框
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  // 绘制一些装饰性的方块（模拟二维码外观）
  ctx.fillStyle = '#000000';
  const blockSize = 8;
  const pattern = [
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1]
  ];

  for (let y = 0; y < pattern.length; y++) {
    for (let x = 0; x < pattern[y].length; x++) {
      if (pattern[y][x] === 1) {
        ctx.fillRect(
          20 + x * blockSize,
          20 + y * blockSize,
          blockSize - 1,
          blockSize - 1
        );
      }
    }
  }

  // 添加提示文字
  ctx.fillStyle = '#666666';
  ctx.font = '12px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(i18n.t('component.loadingScreen.qrCodeText'), canvas.width / 2, canvas.height - 15);

  // 返回Canvas数据URL
  return canvas.toDataURL('image/png');
}

/**
 * 生成各社交媒体分享链接
 * @param text 分享文案
 * @param url 分享链接
 * @returns 各平台分享链接对象
 */
export function socialShareUrls(text: string, url: string) {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  return {
    weibo: `https://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedText}&pic=`,
    wechat: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}`, // 微信通过二维码分享
    qzone: `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodedUrl}&title=${encodedText}&desc=`,
    qq: `https://connect.qq.com/widget/shareqq/index.html?url=${encodedUrl}&title=${encodedText}&desc=`,
    douban: `https://www.douban.com/recommend/?url=${encodedUrl}&title=${encodedText}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedText}`
  };
}

/**
 * 检测设备类型
 * @returns 设备类型信息
 */
export function getDeviceInfo() {
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isWeChat = /MicroMessenger/i.test(userAgent);
  const isQQ = /QQ\//i.test(userAgent);
  const isWeibo = /Weibo/i.test(userAgent);

  return {
    isMobile,
    isWeChat,
    isQQ,
    isWeibo,
    platform: isWeChat ? 'wechat' : isQQ ? 'qq' : isWeibo ? 'weibo' : 'web'
  };
}

/**
 * 获取适合当前环境的分享方式
 * @returns 推荐的分享方式
 */
export function getRecommendedShareMethod() {
  const deviceInfo = getDeviceInfo();

  if (deviceInfo.isWeChat) {
    return 'wechat';
  }

  if (deviceInfo.isQQ) {
    return 'qq';
  }

  if (deviceInfo.isWeibo) {
    return 'weibo';
  }

  if (deviceInfo.isMobile && navigator.share) {
    return 'native';
  }

  return 'copy';
}

/**
 * 解码分享数据
 * @param encodedData 编码的分享数据
 * @returns 解码后的分享数据或null
 */
export function decodeShareData(encodedData: string): { sri: Partial<SRIResult>, type: string, completedAt: string } | null {
  try {
    const decoded = atob(encodedData);
    const data = JSON.parse(decoded);

    // 验证数据结构
    if (!data.sri || typeof data.sri.totalScore !== 'number' || !data.sri.level || !data.type) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('Failed to decode share data:', error);
    return null;
  }
}

/**
 * 格式化分享数据（用于后端统计，不包含敏感信息）
 * @param session 评估会话
 * @returns 匿名化的分享数据
 */
export function formatShareData(session: AssessmentSession) {
  if (!session.results) {
    return null;
  }

  return {
    timestamp: new Date().toISOString(),
    sri_score: Math.round(session.results.sri.totalScore),
    sri_level: session.results.sri.level,
    assessment_type: session.type,
    // 不包含任何个人身份信息
  };
}