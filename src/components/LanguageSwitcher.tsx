/**
 * 语言切换组件 - 提供中英文切换功能
 * 支持下拉菜单和按钮两种样式
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// 语言选项
const LANGUAGE_OPTIONS = [
  { value: 'zh_CN', label: '中文', flag: '🇨🇳' },
  { value: 'en_US', label: 'English', flag: '🇺🇸' }
];

interface LanguageSwitcherProps {
  variant?: 'button' | 'dropdown';
  size?: 'sm' | 'default' | 'lg';
  showLabel?: boolean;
}

export function LanguageSwitcher({
  variant = 'dropdown',
  size = 'sm',
  showLabel = false
}: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('i18n', langCode);
  };

  const getCurrentLanguageOption = () => {
    return LANGUAGE_OPTIONS.find(option => option.value === i18n.language) || LANGUAGE_OPTIONS[0];
  };

  if (variant === 'button') {
    return (
      <div className="flex items-center gap-2">
        {showLabel && (
          <span className="text-sm text-muted-foreground">
            {t('language.current')}:
          </span>
        )}
        <div className="flex gap-1">
          {LANGUAGE_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={i18n.language === option.value ? 'default' : 'outline'}
              size={size}
              onClick={() => handleLanguageChange(option.value)}
              className="min-w-[60px]"
            >
              <span className="mr-1">{option.flag}</span>
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={size} className="gap-2">
          <Globe className="w-4 h-4" />
          {showLabel && (
            <span className="hidden sm:inline">
              {t('language.switch')}
            </span>
          )}
          <span className="text-sm">
            {getCurrentLanguageOption().flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {LANGUAGE_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleLanguageChange(option.value)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>{option.flag}</span>
              <span>{option.label}</span>
            </div>
            {i18n.language === option.value && (
              <Check className="w-4 h-4 text-psychology-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
