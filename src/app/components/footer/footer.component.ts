import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

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
              <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-cyan-500 text-white font-bold text-lg shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.595 15.12a2 2 0 00-1.806.547M12 4.5v15m-7.5-7.5h15" />
                </svg>
              </div>
              <span class="text-xl font-extrabold bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {{ t('nav.brand') }}
              </span>
              <span class="px-2 py-0.5 text-xs font-semibold rounded bg-blue-500/10 text-blue-600">
                v22.1 Ready
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
              <li><a href="#modules" class="hover:text-blue-500 transition-colors">{{ t('nav.modules') }}</a></li>
              <li><a href="#demo" class="hover:text-blue-500 transition-colors">{{ t('nav.demo') }}</a></li>
              <li><a href="#specs" class="hover:text-blue-500 transition-colors">{{ t('nav.specs') }}</a></li>
            </ul>
          </div>

          <!-- Column 3: Tech Badges -->
          <div class="space-y-3">
            <h4 class="text-sm font-bold text-raw-text uppercase tracking-wider">
              {{ t('footer.techBadges') }}
            </h4>
            <div class="flex flex-wrap gap-2 text-[11px] font-semibold text-raw-text-muted">
              <span class="px-2.5 py-1 rounded-lg bg-raw-surface border border-raw-border">Angular Signals</span>
              <span class="px-2.5 py-1 rounded-lg bg-raw-surface border border-raw-border">Zoneless</span>
              <span class="px-2.5 py-1 rounded-lg bg-raw-surface border border-raw-border">Tailwind CSS v4</span>
              <span class="px-2.5 py-1 rounded-lg bg-raw-surface border border-raw-border">Transloco i18n</span>
              <span class="px-2.5 py-1 rounded-lg bg-raw-surface border border-raw-border">IndexedDB</span>
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
            <span class="hover:text-blue-500 transition-colors">Enterprise SLA 99.99%</span>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {}
