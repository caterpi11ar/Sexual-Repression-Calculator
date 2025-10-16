/**
 * 科学依据页面 - 展示SRI评估工具的理论基础和研究支撑
 * 提供详细的学术背景和量表信效度信息
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Award,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle,
  FileText,
  Globe,
  Home,
  Microscope,
  Shield,
  Target,
  TrendingUp,
  Users
} from 'lucide-react';

export default function Science() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-psychology-calm via-background to-psychology-warm">
      {/* 装饰背景 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-32 right-20 w-28 h-28 bg-psychology-accent/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-16 w-36 h-36 bg-psychology-primary/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-psychology-secondary/3 rounded-full blur-2xl"></div>
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
              <Link to="/guide" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.menu.guide')}
              </Link>
              <LanguageSwitcher variant="dropdown" size="sm" />
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <Microscope className="w-16 h-16 text-psychology-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('science.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('science.page.subtitle')}
          </p>
        </div>

        <div className="space-y-8">
          {/* 理论基础 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-psychology-primary" />
                {t('science.theory.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className='text-lg font-semibold text-foreground'>{t('science.theory.dual_control')}</h3>
                  <p className='text-muted-foreground text-sm leading-relaxed'>
                    {t('science.theory.dual_desc')}
                  </p>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-psychology-warning" />
                    <span className='text-sm font-medium'>{t('science.theory.dual_badge')}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className='text-lg font-semibold text-foreground'>{t('science.theory.repression')}</h3>
                  <p className='text-muted-foreground text-sm leading-relaxed'>
                    {t('science.theory.repression_desc')}
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-psychology-success" />
                    <span className='text-sm font-medium'>{t('science.theory.repression_badge')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 量表构成 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-psychology-secondary" />
                {t('science.scales.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-6">
                  {[
                    {
                      name: t('science.scales.sis_ses'),
                      fullName: t('science.scales.sis_full'),
                      items: t('science.scales.sis_items'),
                      author: t('science.scales.sis_author'),
                      reliability: t('science.scales.sis_reliability'),
                      desc: t('science.scales.sis_desc'),
                      color: "bg-psychology-primary/10 border-psychology-primary/20"
                    },
                    {
                      name: t('science.scales.mosher'),
                      fullName: t('science.scales.mosher_full'),
                      items: t('science.scales.mosher_items'),
                      author: t('science.scales.mosher_author'),
                      reliability: t('science.scales.mosher_reliability'),
                      desc: t('science.scales.mosher_desc'),
                      color: "bg-psychology-secondary/10 border-psychology-secondary/20"
                    },
                    {
                      name: t('science.scales.kiss'),
                      fullName: t('science.scales.kiss_full'),
                      items: t('science.scales.kiss_items'),
                      author: t('science.scales.kiss_author'),
                      reliability: t('science.scales.kiss_reliability'),
                      desc: t('science.scales.kiss_desc'),
                      color: "bg-psychology-accent/10 border-psychology-accent/20"
                    },
                    {
                      name: t('science.scales.sos'),
                      fullName: t('science.scales.sos_full'),
                      items: t('science.scales.sos_items'),
                      author: t('science.scales.sos_author'),
                      reliability: t('science.scales.sos_reliability'),
                      desc: t('science.scales.sos_desc'),
                      color: "bg-psychology-warning/10 border-psychology-warning/20"
                    }
                  ].map((scale) => (
                    <Card key={scale.name} className={`${scale.color} border`}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-foreground">{scale.name}</h4>
                              <p className="text-sm text-muted-foreground">{scale.fullName}</p>
                            </div>
                            <Badge variant="secondary">{scale.items}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{scale.desc}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span><strong>{t('science.scales.author')}</strong>{scale.author}</span>
                            <span><strong>{t('science.scales.reliability')}</strong>{scale.reliability}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SRI指数计算 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="w-6 h-6 text-psychology-accent" />
                {t('science.calculation.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className='font-semibold text-foreground mb-2'>{t('science.calculation.standardization')}</h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div>1. <strong>{t('science.calculation.dim1')}</strong></div>
                    <div>2. <strong>{t('science.calculation.dim2')}</strong></div>
                    <div>3. <strong>{t('science.calculation.dim3')}</strong></div>
                    <div>4. <strong>{t('science.calculation.dim4')}</strong></div>
                  </div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className='font-semibold text-foreground mb-2'>{t('science.calculation.zscore')}</h4>
                  <p className='text-sm text-muted-foreground'>
                    {t('science.calculation.zscore_desc')}
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className='font-semibold text-foreground mb-2'>{t('science.calculation.sri')}</h4>
                  <p className='text-sm text-muted-foreground'>
                    {t('science.calculation.sri_desc')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 信效度证据 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-psychology-success" />
                {t('science.validity.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className='font-semibold text-foreground'>{t('science.validity.reliability')}</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span>{t('science.validity.internal')}</span>
                      <Badge variant="secondary">α &gt; 0.80</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span>{t('science.validity.test_retest')}</span>
                      <Badge variant="secondary">r &gt; 0.75</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span>{t('science.validity.split_half')}</span>
                      <Badge variant="secondary">r &gt; 0.78</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className='font-semibold text-foreground'>{t('science.validity.validity')}</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span>{t('science.validity.structural')}</span>
                      <Badge variant="secondary">CFI &gt; 0.90</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span>{t('science.validity.convergent')}</span>
                      <Badge variant="secondary">AVE &gt; 0.50</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span>{t('science.validity.discriminant')}</span>
                      <Badge variant="secondary">√AVE &gt; r</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 研究应用 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-psychology-secondary" />
                {t('science.applications.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    title: t('science.applications.psychology'),
                    desc: t('science.applications.psychology_desc'),
                    icon: Brain,
                    count: t('science.applications.psychology_count')
                  },
                  {
                    title: t('science.applications.clinical'),
                    desc: t('science.applications.clinical_desc'),
                    icon: FileText,
                    count: t('science.applications.clinical_count')
                  },
                  {
                    title: t('science.applications.cultural'),
                    desc: t('science.applications.cultural_desc'),
                    icon: Users,
                    count: t('science.applications.cultural_count')
                  }
                ].map(({ title, desc, icon: Icon, count }) => (
                  <div key={title} className="text-center p-4 bg-muted/30 rounded-lg">
                    <Icon className="w-8 h-8 text-psychology-primary mx-auto mb-3" />
                    <h4 className="font-semibold text-foreground mb-2">{title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{desc}</p>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 限制说明 */}
          <Card className="sri-card border-psychology-warning/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-psychology-warning">
                <TrendingUp className="w-6 h-6" />
                {t('science.limitations.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-psychology-warning/5 border border-psychology-warning/20 rounded-lg p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>{t('science.limitations.norm')}</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>{t('science.limitations.error')}</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>{t('science.limitations.dynamic')}</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>{t('science.limitations.research')}</strong></span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 行动按钮 */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="bg-psychology-primary hover:bg-psychology-primary/90">
                <Link to="/guide" className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  {t('science.actions.view_guide')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/assessment" className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  {t('science.actions.start_assessment')}
                </Link>
              </Button>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                {t('science.actions.back_home')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}