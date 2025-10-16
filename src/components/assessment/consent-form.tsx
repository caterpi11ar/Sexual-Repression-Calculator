/**
 * 知情同意书组件 - 确保用户了解测评目的和隐私政策
 * 提供专业的伦理保护和透明的信息披露
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Eye, FileText, Shield, Users } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTranslation } from 'react-i18next';

interface ConsentFormProps {
  onConsent: (consented: boolean) => void;
  onBack?: () => void;
  isMinor?: boolean; // 是否为未成年人
}

export function ConsentForm({ onConsent, onBack, isMinor = false }: ConsentFormProps) {
  const { t } = useTranslation();
  const [agreements, setAgreements] = useState({
    purpose: false,
    privacy: false,
    voluntary: false,
    nonDiagnostic: false,
    ...(isMinor && { parentalConsent: false, ageConfirmation: false })
  });

  const allAgreed = Object.values(agreements).every(Boolean);

  const handleAgreementChange = (key: keyof typeof agreements, checked: boolean) => {
    setAgreements(prev => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 主标题 */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-psychology-primary mb-2">
          {t('assessment.consent.title')}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t('assessment.consent.subtitle')}
        </p>
      </div>

      {/* 知情同意书内容 */}
      <Card className="sri-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-psychology-primary" />
            {t('assessment.consent.form.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 评估目的 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-psychology-secondary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">{t('assessment.consent.purpose.title')}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('assessment.consent.purpose.description')}
                </p>
              </div>
            </div>
            <div className="ml-8">
              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <Checkbox
                  checked={agreements.purpose}
                  onCheckedChange={(checked) => handleAgreementChange('purpose', !!checked)}
                  className="mt-1"
                />
                <span>{t('assessment.consent.purpose.agree')}</span>
              </label>
            </div>
          </div>

          {/* 隐私保护 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-psychology-secondary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">{t('assessment.consent.privacy.title')}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('assessment.consent.privacy.description')}
                </p>
              </div>
            </div>
            <div className="ml-8">
              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <Checkbox
                  checked={agreements.privacy}
                  onCheckedChange={(checked) => handleAgreementChange('privacy', !!checked)}
                  className="mt-1"
                />
                <span>{t('assessment.consent.privacy.agree')}</span>
              </label>
            </div>
          </div>

          {/* 自愿参与 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-psychology-secondary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">{t('assessment.consent.voluntary.title')}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('assessment.consent.voluntary.description')}
                </p>
              </div>
            </div>
            <div className="ml-8">
              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <Checkbox
                  checked={agreements.voluntary}
                  onCheckedChange={(checked) => handleAgreementChange('voluntary', !!checked)}
                  className="mt-1"
                />
                <span>{t('assessment.consent.voluntary.agree')}</span>
              </label>
            </div>
          </div>

          {/* 非诊断性质 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-psychology-warning mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">{t('assessment.consent.nondiagnostic.title')}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('assessment.consent.nondiagnostic.description')}
                </p>
              </div>
            </div>
            <div className="ml-8">
              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <Checkbox
                  checked={agreements.nonDiagnostic}
                  onCheckedChange={(checked) => handleAgreementChange('nonDiagnostic', !!checked)}
                  className="mt-1"
                />
                <span>{t('assessment.consent.nondiagnostic.agree')}</span>
              </label>
            </div>
          </div>

          {/* 未成年人特殊条款 */}
          {isMinor && (
            <>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-psychology-warning mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2 text-psychology-warning">{t('assessment.consent.minor.title')}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t('assessment.consent.minor.description')}
                    </p>
                  </div>
                </div>
                <div className="ml-8 space-y-2">
                  <label className="flex items-start gap-2 text-sm cursor-pointer">
                    <Checkbox
                      checked={agreements.ageConfirmation}
                      onCheckedChange={(checked) => handleAgreementChange('ageConfirmation', !!checked)}
                      className="mt-1"
                    />
                    <span>{t('assessment.consent.minor.age')}</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm cursor-pointer">
                    <Checkbox
                      checked={agreements.parentalConsent}
                      onCheckedChange={(checked) => handleAgreementChange('parentalConsent', !!checked)}
                      className="mt-1"
                    />
                    <span>{t('assessment.consent.minor.parental')}</span>
                  </label>
                </div>
              </div>

              <Alert className="border-psychology-warning">
                <AlertTriangle className="h-4 w-4 text-psychology-warning" />
                <AlertDescription className="text-sm">
                  {t('assessment.consent.minor.warning')}
                </AlertDescription>
              </Alert>
            </>
          )}

          {/* 重要提醒 */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {t('assessment.consent.warning')}
            </AlertDescription>
          </Alert>

          {/* 操作按钮 */}
          <div className="flex justify-between pt-4 border-t">
            {onBack && (
              <Button variant="outline" onClick={onBack}>
                {t('form.button.back')}
              </Button>
            )}
            <div className="flex gap-3 ml-auto">
              <Button
                variant="outline"
                onClick={() => onConsent(false)}
              >
                {t('assessment.consent.button.disagree')}
              </Button>
              <Button
                onClick={() => onConsent(true)}
                disabled={!allAgreed}
                className="bg-psychology-primary hover:bg-psychology-primary/90"
              >
                {t('assessment.consent.button.agree')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 底部说明 */}
      <div className="text-center text-xs text-muted-foreground">
        <p>
          {t('assessment.consent.footer')}
        </p>
      </div>
    </div>
  );
}