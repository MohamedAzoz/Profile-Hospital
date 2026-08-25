import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-architecture-metrics',
  imports: [TranslocoDirective],
  template: `
    <section id="capabilities" *transloco="let t" class="py-20 relative overflow-hidden bg-linear-to-b from-transparent via-blue-900/5 to-transparent">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span class="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
            {{ t('capabilities.tag') }}
          </span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-raw-text tracking-tight">
            {{ t('capabilities.title') }}
          </h2>
          <p class="text-base sm:text-lg text-raw-text-muted">
            {{ t('capabilities.subtitle') }}
          </p>
        </div>

        <!-- Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <!-- Card 1: Zoneless Architecture -->
          <div class="glass-card p-8 rounded-3xl border border-raw-border relative overflow-hidden group hover:border-blue-500/50 transition-all">
            <div class="flex items-start gap-5">
              <div class="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div class="space-y-2">
                <h3 class="text-xl font-bold text-raw-text group-hover:text-blue-500 transition-colors">
                  {{ t('capabilities.cap1Title') }}
                </h3>
                <p class="text-sm text-raw-text-muted leading-relaxed">
                  {{ t('capabilities.cap1Desc') }}
                </p>
                <div class="pt-2 flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Angular v22 Signals & Zoneless Native</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 2: Offline-First -->
          <div class="glass-card p-8 rounded-3xl border border-raw-border relative overflow-hidden group hover:border-emerald-500/50 transition-all">
            <div class="flex items-start gap-5">
              <div class="w-14 h-14 rounded-2xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <div class="space-y-2">
                <h3 class="text-xl font-bold text-raw-text group-hover:text-emerald-500 transition-colors">
                  {{ t('capabilities.cap2Title') }}
                </h3>
                <p class="text-sm text-raw-text-muted leading-relaxed">
                  {{ t('capabilities.cap2Desc') }}
                </p>
                <div class="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>IndexedDB & Service Worker Engine</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 3: RBAC Security -->
          <div class="glass-card p-8 rounded-3xl border border-raw-border relative overflow-hidden group hover:border-indigo-500/50 transition-all">
            <div class="flex items-start gap-5">
              <div class="w-14 h-14 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div class="space-y-2">
                <h3 class="text-xl font-bold text-raw-text group-hover:text-indigo-500 transition-colors">
                  {{ t('capabilities.cap3Title') }}
                </h3>
                <p class="text-sm text-raw-text-muted leading-relaxed">
                  {{ t('capabilities.cap3Desc') }}
                </p>
                <div class="pt-2 flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>HIPAA & AES-256 Compliant</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 4: Instant Diagnostic Sync -->
          <div class="glass-card p-8 rounded-3xl border border-raw-border relative overflow-hidden group hover:border-cyan-500/50 transition-all">
            <div class="flex items-start gap-5">
              <div class="w-14 h-14 rounded-2xl bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div class="space-y-2">
                <h3 class="text-xl font-bold text-raw-text group-hover:text-cyan-500 transition-colors">
                  {{ t('capabilities.cap4Title') }}
                </h3>
                <p class="text-sm text-raw-text-muted leading-relaxed">
                  {{ t('capabilities.cap4Desc') }}
                </p>
                <div class="pt-2 flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  <span class="w-2 h-2 rounded-full bg-cyan-500"></span>
                  <span>Instant Cross-Department Pipeline</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class ArchitectureMetricsComponent {}
