/**
 * 进度指示器组件 - 显示评估进度和当前状态
 * 提供清晰的视觉反馈和方向感
 */

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  progress: number;
  scaleName?: string;
  estimatedTimeRemaining?: number; // 预估剩余分钟数
}

export function ProgressIndicator({
  current,
  total,
  progress,
  scaleName,
  estimatedTimeRemaining
}: ProgressIndicatorProps) {
  const { t } = useTranslation();
  // 计算预估剩余时间（如果没有提供）
  const remainingQuestions = total - current;
  const avgTimePerQuestion = 30; // 假设每题30秒
  const estimatedMinutes = estimatedTimeRemaining || Math.ceil((remainingQuestions * avgTimePerQuestion) / 60);

  function getMotivationalMessage(progress: number): string {
    if (progress < 20) {
      return t('component.progressIndicator.motivational.start');
    }
    if (progress < 40) {
      return t('component.progressIndicator.motivational.good');
    }
    if (progress < 60) {
      return t('component.progressIndicator.motivational.halfway');
    }
    if (progress < 80) {
      return t('component.progressIndicator.motivational.almost');
    }
    if (progress < 95) {
      return t('component.progressIndicator.motivational.final');
    }
    return t('component.progressIndicator.motivational.complete');
  }

  // 获取进度阶段
  const getProgressStage = () => {
    if (progress < 25) return { label: t('component.progressIndicator.stage.starting'), color: 'bg-blue-500', textColor: 'text-blue-600' };
    if (progress < 50) return { label: t('component.progressIndicator.stage.progressing'), color: 'bg-yellow-500', textColor: 'text-yellow-600' };
    if (progress < 75) return { label: t('component.progressIndicator.stage.halfway'), color: 'bg-orange-500', textColor: 'text-orange-600' };
    if (progress < 95) return { label: t('component.progressIndicator.stage.almost'), color: 'bg-green-500', textColor: 'text-green-600' };
    return { label: t('component.progressIndicator.stage.finishing'), color: 'bg-psychology-primary', textColor: 'text-psychology-primary' };
  };

  const stage = getProgressStage();

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="sri-card border-muted/50">
        <CardContent className="p-6">
          {/* 主要进度信息 */}
          <div className="space-y-4">
            {/* 顶部信息行 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-psychology-primary" />
                <span className="font-semibold text-lg">
                  {t('component.progressIndicator.questionProgress', { current, total })}
                </span>
                <Badge
                  variant="secondary"
                  className={`${stage.textColor} bg-opacity-10`}
                >
                  {stage.label}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {estimatedMinutes > 0 && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{t('component.progressIndicator.estimatedTime', { minutes: estimatedMinutes })}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>
            </div>

            {/* 进度条 */}
            <div className="space-y-2">
              <Progress
                value={progress}
                className="h-3 bg-muted"
              />

              {/* 进度条下方的量表信息 */}
              {scaleName && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    {t('component.progressIndicator.currentScale', { scaleName })}
                  </span>
                  <span className="text-muted-foreground">
                    {current} / {total}
                  </span>
                </div>
              )}
            </div>

            {/* 激励文案 */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {getMotivationalMessage(progress)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * 根据进度生成激励文案
 */
