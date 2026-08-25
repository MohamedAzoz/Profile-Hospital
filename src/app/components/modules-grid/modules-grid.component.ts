import { Component, inject, signal, computed } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { LanguageService } from '../../services/language.service';

export interface HealthcareModule {
  id: string;
  icon: string;
  keyPrefix: string;
  category: 'clinical' | 'diagnostic' | 'operations' | 'admin';
  badgeColor: string;
  gradient: string;
}

@Component({
  selector: 'app-modules-grid',
  imports: [TranslocoDirective],
  template: `
    <section id="modules" *transloco="let t" class="py-24 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span class="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700">
            {{ t('modules.tag') }}
          </span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-raw-text tracking-tight">
            {{ t('modules.title') }}
          </h2>
          <p class="text-base sm:text-lg text-raw-text-muted">
            {{ t('modules.subtitle') }}
          </p>
        </div>

        <!-- Filter & Search Controls Bar -->
        <div class="mb-12 flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-4 rounded-3xl border border-raw-border">
          
          <!-- Tab Category Filters -->
          <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              type="button"
              (click)="selectedCategory.set('all')"
              class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap"
              [class.bg-blue-600]="selectedCategory() === 'all'"
              [class.text-white]="selectedCategory() === 'all'"
              [class.shadow-lg]="selectedCategory() === 'all'"
              [class.bg-raw-surface]="selectedCategory() !== 'all'"
              [class.text-raw-text]="selectedCategory() !== 'all'"
              [class.border]="selectedCategory() !== 'all'"
              [class.border-raw-border]="selectedCategory() !== 'all'"
            >
              {{ t('modules.all') }}
            </button>

            <button
              type="button"
              (click)="selectedCategory.set('clinical')"
              class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap"
              [class.bg-blue-600]="selectedCategory() === 'clinical'"
              [class.text-white]="selectedCategory() === 'clinical'"
              [class.shadow-lg]="selectedCategory() === 'clinical'"
              [class.bg-raw-surface]="selectedCategory() !== 'clinical'"
              [class.text-raw-text]="selectedCategory() !== 'clinical'"
              [class.border]="selectedCategory() !== 'clinical'"
              [class.border-raw-border]="selectedCategory() !== 'clinical'"
            >
              {{ t('modules.clinical') }}
            </button>

            <button
              type="button"
              (click)="selectedCategory.set('diagnostic')"
              class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap"
              [class.bg-blue-600]="selectedCategory() === 'diagnostic'"
              [class.text-white]="selectedCategory() === 'diagnostic'"
              [class.shadow-lg]="selectedCategory() === 'diagnostic'"
              [class.bg-raw-surface]="selectedCategory() !== 'diagnostic'"
              [class.text-raw-text]="selectedCategory() !== 'diagnostic'"
              [class.border]="selectedCategory() !== 'diagnostic'"
              [class.border-raw-border]="selectedCategory() !== 'diagnostic'"
            >
              {{ t('modules.diagnostic') }}
            </button>

            <button
              type="button"
              (click)="selectedCategory.set('operations')"
              class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap"
              [class.bg-blue-600]="selectedCategory() === 'operations'"
              [class.text-white]="selectedCategory() === 'operations'"
              [class.shadow-lg]="selectedCategory() === 'operations'"
              [class.bg-raw-surface]="selectedCategory() !== 'operations'"
              [class.text-raw-text]="selectedCategory() !== 'operations'"
              [class.border]="selectedCategory() !== 'operations'"
              [class.border-raw-border]="selectedCategory() !== 'operations'"
            >
              {{ t('modules.operations') }}
            </button>

            <button
              type="button"
              (click)="selectedCategory.set('admin')"
              class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap"
              [class.bg-blue-600]="selectedCategory() === 'admin'"
              [class.text-white]="selectedCategory() === 'admin'"
              [class.shadow-lg]="selectedCategory() === 'admin'"
              [class.bg-raw-surface]="selectedCategory() !== 'admin'"
              [class.text-raw-text]="selectedCategory() !== 'admin'"
              [class.border]="selectedCategory() !== 'admin'"
              [class.border-raw-border]="selectedCategory() !== 'admin'"
            >
              {{ t('modules.admin') }}
            </button>
          </div>

          <!-- Search Input Box -->
          <div class="relative w-full md:w-72">
            <input
              type="text"
              [value]="searchQuery()"
              (input)="onSearchInput($event)"
              [placeholder]="t('modules.searchPlaceholder')"
              class="w-full px-4 py-2.5 pl-10 pr-4 rounded-2xl bg-raw-surface text-raw-text text-xs sm:text-sm border border-raw-border focus:outline-none focus:border-blue-500 transition-colors"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-raw-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

        </div>

        <!-- Modules Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (module of filteredModules(); track module.id) {
            <div class="glass-card p-6 rounded-3xl border border-raw-border flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300">
              
              <div>
                <!-- Top Badge & Icon -->
                <div class="flex items-center justify-between mb-5">
                  <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md border border-white/20" [class]="module.gradient">
                    {{ module.icon }}
                  </div>
                  <span class="px-3 py-1 rounded-full text-xs font-extrabold shadow-sm border border-white/10" [class]="module.badgeColor">
                    {{ t('modules.' + module.keyPrefix + 'Badge') }}
                  </span>
                </div>

                <!-- Module Title -->
                <h3 class="text-xl font-bold text-raw-text group-hover:text-blue-500 transition-colors mb-2">
                  {{ t('modules.' + module.keyPrefix + 'Title') }}
                </h3>

                <!-- Module Category -->
                <p class="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
                  {{ t('modules.' + module.keyPrefix + 'Category') }}
                </p>

                <!-- Description -->
                <p class="text-xs sm:text-sm text-raw-text-muted leading-relaxed mb-6">
                  {{ t('modules.' + module.keyPrefix + 'Desc') }}
                </p>

                <!-- Features Bullets -->
                <div class="space-y-2 border-t border-raw-border/60 pt-4 mb-6">
                  <div class="flex items-center gap-2 text-xs font-medium text-raw-text">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{{ t('modules.' + module.keyPrefix + 'Feat1') }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs font-medium text-raw-text">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{{ t('modules.' + module.keyPrefix + 'Feat2') }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs font-medium text-raw-text">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{{ t('modules.' + module.keyPrefix + 'Feat3') }}</span>
                  </div>
                </div>
              </div>

              <!-- Action Button -->
              <button
                type="button"
                (click)="activeModalModule.set(module)"
                class="w-full py-3 rounded-2xl bg-raw-surface hover:bg-blue-600 hover:text-white border border-raw-border text-raw-text text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group-hover:border-blue-500"
              >
                <span>{{ t('modules.viewDetails') }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

            </div>
          }
        </div>

        <!-- Detail Modal Popup -->
        @if (activeModalModule()) {
          @let mod = activeModalModule()!;
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity">
            <div class="glass-card max-w-xl w-full p-8 rounded-3xl border border-raw-border shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-200">
              
              <!-- Close Button -->
              <button 
                type="button"
                (click)="activeModalModule.set(null)"
                class="absolute top-6 right-6 p-2 rounded-full bg-raw-surface border border-raw-border text-raw-text hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-white/20" [class]="mod.gradient">
                  {{ mod.icon }}
                </div>
                <div>
                  <h3 class="text-2xl font-black text-raw-text">
                    {{ t('modules.' + mod.keyPrefix + 'Title') }}
                  </h3>
                  <p class="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {{ t('modules.' + mod.keyPrefix + 'Category') }}
                  </p>
                </div>
              </div>

              <p class="text-sm text-raw-text-muted leading-relaxed">
                {{ t('modules.' + mod.keyPrefix + 'Desc') }}
              </p>

              <div class="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl space-y-2">
                <h4 class="text-xs font-bold text-blue-600 dark:text-blue-300 uppercase tracking-wide">
                  {{ t('modules.featuresCount') }} (v22 Ready)
                </h4>
                <ul class="space-y-1.5 text-xs font-medium text-raw-text">
                  <li class="flex items-center gap-2">🔹 {{ t('modules.' + mod.keyPrefix + 'Feat1') }}</li>
                  <li class="flex items-center gap-2">🔹 {{ t('modules.' + mod.keyPrefix + 'Feat2') }}</li>
                  <li class="flex items-center gap-2">🔹 {{ t('modules.' + mod.keyPrefix + 'Feat3') }}</li>
                </ul>
              </div>

              <div class="pt-2 flex justify-end">
                <button
                  type="button"
                  (click)="activeModalModule.set(null)"
                  class="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold text-xs shadow-lg hover:bg-blue-700 transition-all cursor-pointer"
                >
                  {{ t('modules.closeModal') }}
                </button>
              </div>

            </div>
          </div>
        }

      </div>
    </section>
  `
})
export class ModulesGridComponent {
  protected readonly langService = inject(LanguageService);
  protected readonly transloco = inject(TranslocoService);

  readonly selectedCategory = signal<string>('all');
  readonly searchQuery = signal<string>('');
  readonly activeModalModule = signal<HealthcareModule | null>(null);

  readonly modulesList = signal<HealthcareModule[]>([
    { id: '1', icon: '📊', keyPrefix: 'm1', category: 'admin', badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-200', gradient: 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white' },
    { id: '2', icon: '🏥', keyPrefix: 'm2', category: 'clinical', badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-200', gradient: 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white' },
    { id: '3', icon: '⏱️', keyPrefix: 'm3', category: 'operations', badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-200', gradient: 'bg-gradient-to-tr from-amber-500 to-orange-600 text-white' },
    { id: '4', icon: '📁', keyPrefix: 'm4', category: 'clinical', badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200', gradient: 'bg-gradient-to-tr from-emerald-600 to-teal-600 text-white' },
    { id: '5', icon: '💊', keyPrefix: 'm5', category: 'operations', badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-200', gradient: 'bg-gradient-to-tr from-purple-600 to-pink-600 text-white' },
    { id: '6', icon: '🧪', keyPrefix: 'm6', category: 'diagnostic', badgeColor: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/60 dark:text-cyan-200', gradient: 'bg-gradient-to-tr from-cyan-600 to-blue-600 text-white' },
    { id: '7', icon: '🩻', keyPrefix: 'm7', category: 'diagnostic', badgeColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-200', gradient: 'bg-gradient-to-tr from-teal-600 to-emerald-600 text-white' },
    { id: '8', icon: '🩺', keyPrefix: 'm8', category: 'clinical', badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-200', gradient: 'bg-gradient-to-tr from-blue-600 to-cyan-600 text-white' },
    { id: '9', icon: '👥', keyPrefix: 'm9', category: 'admin', badgeColor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200', gradient: 'bg-gradient-to-tr from-slate-700 to-slate-900 text-white' },
    { id: '10', icon: '🔔', keyPrefix: 'm10', category: 'operations', badgeColor: 'bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-200', gradient: 'bg-gradient-to-tr from-rose-600 to-red-600 text-white' },
  ]);

  readonly filteredModules = computed(() => {
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();
    const allMods = this.modulesList();

    return allMods.filter(m => {
      const matchCat = cat === 'all' || m.category === cat;
      const title = this.transloco.translate(`modules.${m.keyPrefix}Title`).toLowerCase();
      const desc = this.transloco.translate(`modules.${m.keyPrefix}Desc`).toLowerCase();
      const matchQuery = !query || title.includes(query) || desc.includes(query);
      return matchCat && matchQuery;
    });
  });

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }
}
