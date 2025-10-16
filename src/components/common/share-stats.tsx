/**
 * 分享统计组件 - 显示分享相关的统计信息
 * 提供分享次数、影响力等信息展示
 */

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, Globe, Heart, Share2, Sparkles, Target, TrendingUp, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface ShareStatsProps {
  className?: string;
}

export function ShareStats({ className }: ShareStatsProps) {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalShares: 0,
    todayShares: 0,
    helpedUsers: 0,
    popularityScore: 0
  });

  useEffect(() => {
    // 模拟获取分享统计数据
    // 在实际应用中，这里会从服务器获取真实数据
    const mockStats = {
      totalShares: Math.floor(Math.random() * 1000) + 500,
      todayShares: Math.floor(Math.random() * 50) + 10,
      helpedUsers: Math.floor(Math.random() * 2000) + 1000,
      popularityScore: Math.floor(Math.random() * 100) + 70
    };
    setStats(mockStats);
  }, []);

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="w-5 h-5 text-psychology-primary" />
          {t('component.shareStats.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 主要统计数据 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {stats.totalShares.toLocaleString()}
            </div>
            <div className="text-sm text-blue-600/80 flex items-center justify-center gap-1">
              <Share2 className="w-3 h-3" />
              {t('component.shareStats.totalShares')}
            </div>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {stats.helpedUsers.toLocaleString()}
            </div>
            <div className="text-sm text-green-600/80 flex items-center justify-center gap-1">
              <Users className="w-3 h-3" />
              {t('component.shareStats.helpedUsers')}
            </div>
          </div>
        </div>

        {/* 今日分享 */}
        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-700">
              {t('component.shareStats.todayShares')}
            </span>
          </div>
          <Badge variant="outline" className="text-orange-600 border-orange-200">
            +{stats.todayShares}
          </Badge>
        </div>

        {/* 流行度指数 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <Globe className="w-4 h-4 text-psychology-primary" />
              {t('component.shareStats.popularityTitle')}
            </span>
            <span className="text-sm text-muted-foreground">
              {stats.popularityScore}/100
            </span>
          </div>
          <Progress value={stats.popularityScore} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{t('component.shareStats.popularityLow')}</span>
            <span>{t('component.shareStats.popularityMedium')}</span>
            <span>{t('component.shareStats.popularityHigh')}</span>
          </div>
        </div>

        {/* 成就徽章 */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Award className="w-4 h-4 text-psychology-primary" />
            {t('component.shareStats.achievementsTitle')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {stats.totalShares > 100 && (
              <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
                {t('component.shareStats.achievementSharer')}
              </Badge>
            )}
            {stats.helpedUsers > 500 && (
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                {t('component.shareStats.achievementHelper')}
              </Badge>
            )}
            {stats.popularityScore > 80 && (
              <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
                {t('component.shareStats.achievementPopular')}
              </Badge>
            )}
            {stats.todayShares > 20 && (
              <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                {t('component.shareStats.achievementToday')}
              </Badge>
            )}
          </div>
        </div>

        {/* 感谢信息 */}
        <div className="bg-psychology-primary/5 rounded-lg p-4 text-center">
          <Heart className="w-6 h-6 text-psychology-primary mx-auto mb-2" />
          <p className="text-sm text-psychology-primary font-medium mb-1">
            {t('component.shareStats.thankYou')}
          </p>
          <p className="text-xs text-muted-foreground">
            {t('component.shareStats.thankYouDesc')}
          </p>
        </div>

        {/* 目标进度 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              {t('component.shareStats.nextMilestone')}
            </span>
            <span className="text-muted-foreground">
              {Math.ceil(stats.totalShares / 100) * 100} 次分享
            </span>
          </div>
          <Progress
            value={(stats.totalShares % 100)}
            className="h-1.5"
          />
          <p className="text-xs text-muted-foreground text-center">
            {t('component.shareStats.sharesNeeded', { count: Math.ceil(stats.totalShares / 100) * 100 - stats.totalShares })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}