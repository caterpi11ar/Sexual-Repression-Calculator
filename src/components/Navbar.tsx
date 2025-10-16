/**
 * 通用导航栏组件 - 提供统一的导航体验
 * 包含品牌标识、导航菜单和语言切换功能
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Brain, Menu, BookOpen, FileText, History, Home } from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  showBackButton?: boolean;
  onBack?: () => void;
  backButtonText?: string;
  title?: string;
  variant?: 'default' | 'assessment';
}

export function Navbar({ 
  showBackButton = false, 
  onBack, 
  backButtonText,
  title,
  variant = 'default'
}: NavbarProps) {
  const { t } = useTranslation();
  const location = useLocation();

  if (variant === 'assessment') {
    return (
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-muted">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-muted-foreground hover:text-foreground"
              >
                <Home className="w-4 h-4 mr-2" />
                {backButtonText || t('nav.home')}
              </Button>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-psychology-primary" />
                <span className="font-semibold text-psychology-primary">
                  {title}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSwitcher variant="dropdown" size="sm" />
              {showBackButton && onBack && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="text-muted-foreground hidden sm:flex"
                >
                  {t('nav.back')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Brain className="w-8 h-8 text-psychology-primary" />
            <span className="text-xl font-semibold text-foreground">SRI Calculator</span>
          </Link>
          
          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/guide" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.menu.guide')}
            </Link>
            <Link to="/science" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.menu.science')}
            </Link>
            <Link to="/history" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.menu.history')}
            </Link>
            <LanguageSwitcher variant="dropdown" size="sm" />
          </div>

          {/* 移动端菜单 */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 mt-4">
                  <Button variant="ghost" size="sm" asChild className="justify-start">
                    <Link to="/" className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      {t('nav.home')}
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="justify-start">
                    <Link to="/guide" className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {t('nav.menu.guide')}
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="justify-start">
                    <Link to="/science" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {t('nav.menu.science')}
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="justify-start">
                    <Link to="/history" className="flex items-center gap-2">
                      <History className="w-4 h-4" />
                      {t('nav.menu.history')}
                    </Link>
                  </Button>
                  <div className="pt-4 border-t">
                    <LanguageSwitcher variant="button" size="sm" showLabel={true} />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
