import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-technical-specs',
  imports: [TranslocoDirective],
  template: `
    <section id="specs" *transloco="let t" class="py-24 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div
          class="text-center max-w-3xl flex flex-col justify-center items-center mx-auto space-y-4 mb-16"
        >
          <span
            class="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700"
          >
            {{ t('specs.tag') }}
          </span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-raw-text tracking-tight">
            {{ t('specs.title') }}
          </h2>
          <p class="text-base sm:text-lg text-raw-text-muted">
            {{ t('specs.subTitle') }}
          </p>
        </div>

        <!-- Capability Badges Strip -->
        <div class="flex flex-wrap items-center justify-center gap-3 mb-16">
          <span
            class="px-4 py-2 rounded-2xl glass border border-blue-500/30 text-xs font-extrabold text-blue-600 dark:text-blue-300 shadow-sm flex items-center gap-2"
          >
            🛡️ حماية البيانات وتشفير HIPAA
          </span>
          <span
            class="px-4 py-2 rounded-2xl glass border border-emerald-500/30 text-xs font-extrabold text-emerald-600 dark:text-emerald-300 shadow-sm flex items-center gap-2"
          >
            📡 تزامن سحابي ومحلي فوري
          </span>
          <span
            class="px-4 py-2 rounded-2xl glass border border-indigo-500/30 text-xs font-extrabold text-indigo-600 dark:text-indigo-300 shadow-sm flex items-center gap-2"
          >
            🚀 استجابة فائقة السرعة
          </span>
          <span
            class="px-4 py-2 rounded-2xl glass border border-cyan-500/30 text-xs font-extrabold text-cyan-600 dark:text-cyan-300 shadow-sm flex items-center gap-2"
          >
            🎨 واجهة مستخدم فاخرة
          </span>
          <span
            class="px-4 py-2 rounded-2xl glass border border-purple-500/30 text-xs font-extrabold text-purple-600 dark:text-purple-300 shadow-sm flex items-center gap-2"
          >
            🌐 ثنائية اللغة (عربي / English)
          </span>
          <span
            class="px-4 py-2 rounded-2xl glass border border-amber-500/30 text-xs font-extrabold text-amber-600 dark:text-amber-300 shadow-sm flex items-center gap-2"
          >
            💾 جاهزية التشغيل بدون إنترنت
          </span>
        </div>

        <!-- Specs Grid Table -->
        <div
          class="glass-card rounded-3xl p-8 border border-raw-border shadow-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div class="p-6 rounded-2xl bg-raw-surface/80 border border-raw-border space-y-2">
            <span class="text-xs font-bold text-raw-text-muted uppercase tracking-wider block">
              {{ t('specs.framework') }}
            </span>
            <div class="text-lg font-black text-raw-text">
              {{ t('specs.frameworkVal') }}
            </div>
            <p class="text-xs text-raw-text-muted">
              ربط سلس وسريع بين المستشفيات والفروع المختلفة.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-raw-surface/80 border border-raw-border space-y-2">
            <span class="text-xs font-bold text-raw-text-muted uppercase tracking-wider block">
              {{ t('specs.state') }}
            </span>
            <div class="text-lg font-black text-raw-text">
              {{ t('specs.stateVal') }}
            </div>
            <p class="text-xs text-raw-text-muted">تحديث البيانات تلقائياً للشاشات والأجهزة.</p>
          </div>

          <div class="p-6 rounded-2xl bg-raw-surface/80 border border-raw-border space-y-2">
            <span class="text-xs font-bold text-raw-text-muted uppercase tracking-wider block">
              {{ t('specs.architecture') }}
            </span>
            <div class="text-lg font-black text-emerald-600 dark:text-emerald-400">
              {{ t('specs.architectureVal') }}
            </div>
            <p class="text-xs text-raw-text-muted">ضمان استمرار العمل حتى في حال انقطاع الشبكة.</p>
          </div>

          <div class="p-6 rounded-2xl bg-raw-surface/80 border border-raw-border space-y-2">
            <span class="text-xs font-bold text-raw-text-muted uppercase tracking-wider block">
              {{ t('specs.styling') }}
            </span>
            <div class="text-lg font-black text-raw-text">
              {{ t('specs.stylingVal') }}
            </div>
            <p class="text-xs text-raw-text-muted">مظهر عصري يدعم الوضعين الداكن والفاتح.</p>
          </div>

          <div class="p-6 rounded-2xl bg-raw-surface/80 border border-raw-border space-y-2">
            <span class="text-xs font-bold text-raw-text-muted uppercase tracking-wider block">
              {{ t('specs.i18nTitle') }}
            </span>
            <div class="text-lg font-black text-raw-text">
              {{ t('specs.i18nVal') }}
            </div>
            <p class="text-xs text-raw-text-muted">تبديل فوري للغة والاتجاه حسب رغبة المستخدم.</p>
          </div>

          <div class="p-6 rounded-2xl bg-raw-surface/80 border border-raw-border space-y-2">
            <span class="text-xs font-bold text-raw-text-muted uppercase tracking-wider block">
              {{ t('specs.storage') }}
            </span>
            <div class="text-lg font-black text-raw-text">
              {{ t('specs.storageVal') }}
            </div>
            <p class="text-xs text-raw-text-muted">أعلى درجات الخصوصية وحفظ ملفات المرضى.</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class TechnicalSpecsComponent {}
