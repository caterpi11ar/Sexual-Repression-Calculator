/**
 * 使用指南页面 - 详细的测评指导和注意事项
 * 帮助用户了解如何正确使用SRI评估工具
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle,
  Clock,
  FileText,
  Heart,
  Home,
  Info,
  Lightbulb,
  Shield,
  Target,
  Users
} from 'lucide-react';

export default function Guide() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-psychology-calm via-background to-psychology-warm">
      {/* 装饰背景 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-psychology-primary/5 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-16 w-24 h-24 bg-psychology-accent/5 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-psychology-secondary/5 rounded-full blur-xl"></div>
      </div>

      {/* 导航栏 */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Brain className="w-8 h-8 text-psychology-primary" />
              <span className="text-xl font-semibold text-foreground">SRI Calculator</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.home')}
              </Link>
              <Link to="/science" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.menu.science')}
              </Link>
              <LanguageSwitcher variant="dropdown" size="sm" />
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <BookOpen className="w-16 h-16 text-psychology-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('nav.menu.guide')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('guide.subtitle')}
          </p>
        </div>

        <div className="space-y-8">
          {/* 快速开始 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="w-6 h-6 text-psychology-primary" />
                {t('guide.quick_start.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-psychology-primary/10 text-psychology-primary">
                      {t('guide.quick_start.quick_badge')}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{t('guide.quick_start.quick_recommend')}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-psychology-secondary" />
                      <span>{t('guide.quick_start.quick_duration')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-psychology-secondary" />
                      <span>{t('guide.quick_start.quick_questions')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-psychology-success" />
                      <span>{t('guide.quick_start.quick_coverage')}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-psychology-accent/10 text-psychology-accent">
                      {t('guide.quick_start.full_badge')}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{t('guide.quick_start.full_recommend')}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-psychology-secondary" />
                      <span>{t('guide.quick_start.full_duration')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-psychology-secondary" />
                      <span>{t('guide.quick_start.full_questions')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-psychology-accent" />
                      <span>{t('guide.quick_start.full_analysis')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 测评流程 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <ArrowRight className="w-6 h-6 text-psychology-secondary" />
                {t('guide.process.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  {[
                    { step: 1, title: t('guide.process.step1.title'), desc: t('guide.process.step1.desc'), icon: Shield },
                    { step: 2, title: t('guide.process.step2.title'), desc: t('guide.process.step2.desc'), icon: Users },
                    { step: 3, title: t('guide.process.step3.title'), desc: t('guide.process.step3.desc'), icon: FileText },
                    { step: 4, title: t('guide.process.step4.title'), desc: t('guide.process.step4.desc'), icon: Brain }
                  ].map(({ step, title, desc, icon: Icon }) => (
                    <div key={step} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-psychology-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-5 h-5 text-psychology-primary" />
                          <h4 className="font-semibold text-foreground">{title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 答题建议 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-psychology-warning" />
                {t('guide.tips.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {[
                  {
                    title: t('guide.tips.honest.title'),
                    desc: t('guide.tips.honest.desc'),
                    icon: Heart,
                    color: "text-psychology-success"
                  },
                  {
                    title: t('guide.tips.intuition.title'),
                    desc: t('guide.tips.intuition.desc'),
                    icon: Brain,
                    color: "text-psychology-primary"
                  },
                  {
                    title: t('guide.tips.complete.title'),
                    desc: t('guide.tips.complete.desc'),
                    icon: Target,
                    color: "text-psychology-secondary"
                  },
                  {
                    title: t('guide.tips.privacy.title'),
                    desc: t('guide.tips.privacy.desc'),
                    icon: Shield,
                    color: "text-psychology-accent"
                  }
                ].map(({ title, desc, icon: Icon, color }) => (
                  <div key={title} className="flex items-start gap-3 p-3 border border-border/50 rounded-lg">
                    <Icon className={`w-5 h-5 ${color} mt-0.5 flex-shrink-0`} />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">{title}</h4>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 注意事项 */}
          <Card className="sri-card border-psychology-warning/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-psychology-warning">
                <AlertTriangle className="w-6 h-6" />
                {t('guide.notice.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-psychology-warning/5 border border-psychology-warning/20 rounded-lg p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>{t('guide.notice.non_diagnostic')}</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>{t('guide.notice.privacy')}</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>{t('guide.notice.age')}</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>{t('guide.notice.mental_health')}</strong></span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 结果解读 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Info className="w-6 h-6 text-psychology-secondary" />
                {t('guide.interpretation.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className='font-semibold text-foreground mb-2'>{t('guide.interpretation.range_title')}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                    {[
                      { range: "0-20", label: t('guide.interpretation.range.very_low'), color: "bg-psychology-success/10 text-psychology-success" },
                      { range: "20-40", label: t('guide.interpretation.range.low'), color: "bg-green-100 text-green-700" },
                      { range: "40-60", label: t('guide.interpretation.range.moderate'), color: "bg-yellow-100 text-yellow-700" },
                      { range: "60-80", label: t('guide.interpretation.range.high'), color: "bg-psychology-warning/10 text-psychology-warning" },
                      { range: "80-100", label: t('guide.interpretation.range.very_high'), color: "bg-psychology-danger/10 text-psychology-danger" }
                    ].map(({ range, label, color }) => (
                      <div key={range} className={`p-2 rounded text-center ${color}`}>
                        <div className="font-medium">{range}</div>
                        <div className="text-xs">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className='font-semibold text-foreground mb-2'>{t('guide.interpretation.dimensions_title')}</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    {[
                      { name: t('guide.interpretation.dimension1.name'), desc: t('guide.interpretation.dimension1.desc') },
                      { name: t('guide.interpretation.dimension2.name'), desc: t('guide.interpretation.dimension2.desc') },
                      { name: t('guide.interpretation.dimension3.name'), desc: t('guide.interpretation.dimension3.desc') },
                      { name: t('guide.interpretation.dimension4.name'), desc: t('guide.interpretation.dimension4.desc') }
                    ].map(({ name, desc }) => (
                      <div key={name} className="p-3 bg-muted/30 rounded">
                        <div className="font-medium text-foreground">{name}</div>
                        <div className="text-muted-foreground">{desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 行动按钮 */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="bg-psychology-primary hover:bg-psychology-primary/90">
                <Link to="/assessment?type=quick" className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  {t('guide.actions.quick_start')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/assessment?type=full" className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {t('guide.actions.full_start')}
                </Link>
              </Button>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                {t('guide.actions.back_home')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}