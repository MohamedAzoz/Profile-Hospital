import { Component, inject } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-footer',
  imports: [TranslocoDirective],
  template: `
    <footer *transloco="let t" class="glass border-t border-raw-border py-12 relative overflow-hidden transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <!-- Column 1: Brand Info -->
          <div class="md:col-span-2 space-y-4">
            <div class="flex items-center gap-3">
              <img 
                [src]="themeService.theme() === 'dark' ? '/LogoDark.webp' : '/Logo.webp'" 
                alt="Full Health Logo" 
                class="h-10 w-auto object-contain drop-shadow-sm"
              />
              <span class="text-xl font-black bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Full Health
              </span>
              <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20">
                Enterprise Edition
              </span>
            </div>

            <p class="text-xs sm:text-sm text-raw-text-muted leading-relaxed max-w-md">
              {{ t('footer.brandDesc') }}
            </p>
          </div>

          <!-- Column 2: Quick Links -->
          <div class="space-y-3">
            <h4 class="text-sm font-bold text-raw-text uppercase tracking-wider">
              {{ t('footer.quickLinks') }}
            </h4>
            <ul class="space-y-2 text-xs font-medium text-raw-text-muted">
              <li><a href="#hero" class="hover:text-blue-500 transition-colors">{{ t('nav.home') }}</a></li>
              <li><a href="#capabilities" class="hover:text-blue-500 transition-colors">{{ t('nav.capabilities') }}</a></li>
              <li><a href="#screens" class="hover:text-blue-500 transition-colors">{{ t('nav.screens') }}</a></li>
              <li><a href="#modules" class="hover:text-blue-500 transition-colors">{{ t('nav.modules') }}</a></li>
              <li><a href="#demo" class="hover:text-blue-500 transition-colors">{{ t('nav.demo') }}</a></li>
              <li><a href="#specs" class="hover:text-blue-500 transition-colors">{{ t('nav.specs') }}</a></li>
            </ul>
          </div>

          <!-- Column 3: System Roles Badges -->
          <div class="space-y-3">
            <h4 class="text-sm font-bold text-raw-text uppercase tracking-wider">
              {{ t('footer.techBadges') }}
            </h4>
            <div class="flex flex-wrap gap-2 text-[11px] font-semibold text-raw-text-muted">
              <span class="px-2.5 py-1 rounded-lg bg-raw-surface border border-raw-border">🩺 بوابة الطبيب</span>
              <span class="px-2.5 py-1 rounded-lg bg-raw-surface border border-raw-border">💊 صيدلية ومخزون</span>
              <span class="px-2.5 py-1 rounded-lg bg-raw-surface border border-raw-border">👤 بوابة المريض</span>
              <span class="px-2.5 py-1 rounded-lg bg-raw-surface border border-raw-border">🩺 المساعد الطبي</span>
              <span class="px-2.5 py-1 rounded-lg bg-raw-surface border border-raw-border">🧪 المختبر والأشعة</span>
            </div>
          </div>

        </div>

        <div class="pt-8 border-t border-raw-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-raw-text-muted">
          <p>{{ t('footer.copyright') }}</p>
          <div class="flex items-center gap-4">
            <span class="hover:text-blue-500 transition-colors">HIPAA Compliant</span>
            <span>•</span>
            <span class="hover:text-blue-500 transition-colors">AES-256 Encrypted</span>
            <span>•</span>
            <span class="hover:text-blue-500 transition-colors">24/7 Availability</span>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  protected readonly themeService = inject(ThemeService);
}
