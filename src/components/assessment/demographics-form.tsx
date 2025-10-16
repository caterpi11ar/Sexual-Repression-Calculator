/**
 * 人口学信息表单组件 - 收集必要的背景信息用于结果分析
 * 遵循最小化数据收集原则，保护用户隐私
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Users } from 'lucide-react';
import { Demographics } from '@/types';
import { DEMOGRAPHICS_QUESTIONS } from '@/lib/scales';
import { useTranslation } from 'react-i18next';

interface DemographicsFormProps {
  onSubmit: (demographics: Demographics) => void;
  onBack?: () => void;
  initialData?: Partial<Demographics>;
}

export function DemographicsForm({ onSubmit, onBack, initialData }: DemographicsFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<Demographics & Record<string, unknown>>>({
    consentToParticipate: true,
    ...initialData
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (questionId: string, value: string) => {
    setFormData(prev => ({ ...prev, [questionId]: value }));
    // 清除错误
    if (errors[questionId]) {
      setErrors(prev => ({ ...prev, [questionId]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 检查必填字段
    const requiredQuestions = DEMOGRAPHICS_QUESTIONS.filter(q => q.required);

    for (const question of requiredQuestions) {
      if (!formData[question.id as keyof Demographics]) {
        newErrors[question.id] = t('form.validation.required');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // 构建完整的Demographics对象
    const demographics: Demographics = {
      age: formData.age || '',
      gender: formData.gender || '',
      relationshipStatus: (formData.relationshipStatus || '') as string,
      sexualActivity: (formData.sexualActivity || '') as string,
      religiousCultural: (formData.religiousCultural) as string | undefined,
      consentToParticipate: true
    };

    onSubmit(demographics);
  };


  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* 标题 */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-psychology-primary mb-2">
          {t('assessment.demographics.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('assessment.demographics.description')}
        </p>
      </div>

      {/* 表单内容 */}
      <Card className="sri-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-psychology-primary" />
            {t('assessment.demographics.form.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {DEMOGRAPHICS_QUESTIONS.map((question) => {
            const currentValue = formData[question.id as keyof Demographics]?.toString() || '';
            const hasError = !!errors[question.id];

            return (
              <div key={question.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">
                    {question.text}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {!question.required && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {t('assessment.demographics.optional')}
                    </span>
                  )}
                </div>

                <RadioGroup
                  value={currentValue}
                  onValueChange={(value) => handleChange(question.id, value)}
                  className="grid grid-cols-1 gap-3"
                >
                  {question.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3">
                      <RadioGroupItem
                        value={option.value.toString()}
                        id={`${question.id}-${option.value}`}
                        className="text-psychology-primary"
                      />
                      <Label
                        htmlFor={`${question.id}-${option.value}`}
                        className="text-sm font-normal cursor-pointer flex-1 p-2 rounded hover:bg-muted/50 transition-colors"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {hasError && (
                  <p className="text-sm text-red-500">{errors[question.id]}</p>
                )}
              </div>
            );
          })}

          {/* 隐私提醒 */}
          <div className="bg-muted/30 p-4 rounded-lg border border-muted">
            <h4 className="font-medium text-sm mb-2">{t('assessment.demographics.privacy.title')}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t('assessment.demographics.privacy.description')}
            </p>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-between pt-4 border-t">
            {onBack && (
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('form.button.back')}
              </Button>
            )}
            <Button
              onClick={handleSubmit}
              className="bg-psychology-primary hover:bg-psychology-primary/90 ml-auto"
            >
              {t('assessment.demographics.button.continue')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 进度提示 */}
      <div className="text-center text-sm text-muted-foreground">
        {t('assessment.demographics.progress')}
      </div>
    </div>
  );
}