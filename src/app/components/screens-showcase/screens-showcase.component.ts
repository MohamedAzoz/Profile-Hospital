import { NgClass } from '@angular/common';
import { Component, ElementRef, inject, signal, computed, effect } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { gsap } from 'gsap';

export interface SystemScreenItem {
  id: string;
  imageFileName: string;
  keyPrefix: string;
  category: 'doctor' | 'pharmacist' | 'patient' | 'assistant' | 'labRadiology' | 'notifications';
  roleLabelAr: string;
  roleLabelEn: string;
  badgeBg: string;
}

@Component({
  selector: 'app-screens-showcase',
  imports: [TranslocoDirective, NgClass],
  template: `
    <section
      id="screens"
      *transloco="let t"
      class="py-24 relative overflow-hidden bg-linear-to-b from-blue-950/10 via-transparent to-blue-950/10"
    >
      <!-- Background Ambient Aura -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 bg-linear-to-r from-blue-600/10 via-indigo-600/10 to-cyan-500/10 blur-[140px] rounded-full pointer-events-none"
      ></div>

      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-40"
        [ngClass]="{ 'z-100': activeLightboxScreen(), 'z-40': !activeLightboxScreen() }"
      >
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto space-y-4 flex flex-col items-center mb-14">
          <span
            class="px-5 py-2 rounded-full text-xs mb-2 lg:mb-8 font-black uppercase tracking-widest bg-linear-to-r from-blue-600/20 to-indigo-600/20 text-blue-600 dark:text-blue-300 border border-blue-500/30 shadow-md"
          >
            {{ t('screens.tag') }}
          </span>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black text-raw-text tracking-tight">
            {{ t('screens.title') }}
          </h2>
          <p class="text-base sm:text-lg text-raw-text-muted leading-relaxed font-medium">
            {{ t('screens.subtitle') }}
          </p>
        </div>

        <!-- Role Category Filter Tabs -->
        <div
          class="mb-12 flex items-center justify-center gap-2 overflow-x-auto pb-3 scrollbar-none"
        >
          <button
            type="button"
            (click)="selectCategory('all')"
            class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap"
            [class.bg-gradient-to-r]="selectedCategory() === 'all'"
            [class.from-blue-600]="selectedCategory() === 'all'"
            [class.to-indigo-600]="selectedCategory() === 'all'"
            [class.text-white]="selectedCategory() === 'all'"
            [class.shadow-xl]="selectedCategory() === 'all'"
            [class.bg-raw-surface]="selectedCategory() !== 'all'"
            [class.text-raw-text]="selectedCategory() !== 'all'"
            [class.border]="selectedCategory() !== 'all'"
            [class.border-raw-border]="selectedCategory() !== 'all'"
          >
            {{ t('screens.all') }}
          </button>

          <button
            type="button"
            (click)="selectCategory('doctor')"
            class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap"
            [class.bg-gradient-to-r]="selectedCategory() === 'doctor'"
            [class.from-blue-600]="selectedCategory() === 'doctor'"
            [class.to-indigo-600]="selectedCategory() === 'doctor'"
            [class.text-white]="selectedCategory() === 'doctor'"
            [class.shadow-xl]="selectedCategory() === 'doctor'"
            [class.bg-raw-surface]="selectedCategory() !== 'doctor'"
            [class.text-raw-text]="selectedCategory() !== 'doctor'"
            [class.border]="selectedCategory() !== 'doctor'"
            [class.border-raw-border]="selectedCategory() !== 'doctor'"
          >
            {{ t('screens.doctor') }}
          </button>

          <button
            type="button"
            (click)="selectCategory('pharmacist')"
            class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap"
            [class.bg-gradient-to-r]="selectedCategory() === 'pharmacist'"
            [class.from-purple-600]="selectedCategory() === 'pharmacist'"
            [class.to-pink-600]="selectedCategory() === 'pharmacist'"
            [class.text-white]="selectedCategory() === 'pharmacist'"
            [class.shadow-xl]="selectedCategory() === 'pharmacist'"
            [class.bg-raw-surface]="selectedCategory() !== 'pharmacist'"
            [class.text-raw-text]="selectedCategory() !== 'pharmacist'"
            [class.border]="selectedCategory() !== 'pharmacist'"
            [class.border-raw-border]="selectedCategory() !== 'pharmacist'"
          >
            {{ t('screens.pharmacist') }}
          </button>

          <button
            type="button"
            (click)="selectCategory('patient')"
            class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap"
            [class.bg-gradient-to-r]="selectedCategory() === 'patient'"
            [class.from-emerald-600]="selectedCategory() === 'patient'"
            [class.to-teal-600]="selectedCategory() === 'patient'"
            [class.text-white]="selectedCategory() === 'patient'"
            [class.shadow-xl]="selectedCategory() === 'patient'"
            [class.bg-raw-surface]="selectedCategory() !== 'patient'"
            [class.text-raw-text]="selectedCategory() !== 'patient'"
            [class.border]="selectedCategory() !== 'patient'"
            [class.border-raw-border]="selectedCategory() !== 'patient'"
          >
            {{ t('screens.patient') }}
          </button>

          <button
            type="button"
            (click)="selectCategory('assistant')"
            class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap"
            [class.bg-gradient-to-r]="selectedCategory() === 'assistant'"
            [class.from-amber-600]="selectedCategory() === 'assistant'"
            [class.to-orange-600]="selectedCategory() === 'assistant'"
            [class.text-white]="selectedCategory() === 'assistant'"
            [class.shadow-xl]="selectedCategory() === 'assistant'"
            [class.bg-raw-surface]="selectedCategory() !== 'assistant'"
            [class.text-raw-text]="selectedCategory() !== 'assistant'"
            [class.border]="selectedCategory() !== 'assistant'"
            [class.border-raw-border]="selectedCategory() !== 'assistant'"
          >
            {{ t('screens.assistant') }}
          </button>

          <button
            type="button"
            (click)="selectCategory('labRadiology')"
            class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap"
            [class.bg-gradient-to-r]="selectedCategory() === 'labRadiology'"
            [class.from-cyan-600]="selectedCategory() === 'labRadiology'"
            [class.to-blue-600]="selectedCategory() === 'labRadiology'"
            [class.text-white]="selectedCategory() === 'labRadiology'"
            [class.shadow-xl]="selectedCategory() === 'labRadiology'"
            [class.bg-raw-surface]="selectedCategory() !== 'labRadiology'"
            [class.text-raw-text]="selectedCategory() !== 'labRadiology'"
            [class.border]="selectedCategory() !== 'labRadiology'"
            [class.border-raw-border]="selectedCategory() !== 'labRadiology'"
          >
            {{ t('screens.labRadiology') }}
          </button>

          <button
            type="button"
            (click)="selectCategory('notifications')"
            class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap"
            [class.bg-gradient-to-r]="selectedCategory() === 'notifications'"
            [class.from-rose-600]="selectedCategory() === 'notifications'"
            [class.to-red-600]="selectedCategory() === 'notifications'"
            [class.text-white]="selectedCategory() === 'notifications'"
            [class.shadow-xl]="selectedCategory() === 'notifications'"
            [class.bg-raw-surface]="selectedCategory() !== 'notifications'"
            [class.text-raw-text]="selectedCategory() !== 'notifications'"
            [class.border]="selectedCategory() !== 'notifications'"
            [class.border-raw-border]="selectedCategory() !== 'notifications'"
          >
            {{ t('screens.notifications') }}
          </button>
        </div>

        <!-- Screens Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 screens-grid">
          @for (item of filteredScreens(); track item.id) {
            <div
              class="screen-card glass-card rounded-3xl overflow-hidden border border-raw-border group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              (click)="activeLightboxScreen.set(item)"
            >
              <div>
                <!-- Screen Image Preview Container -->
                <div
                  class="relative w-full h-56 overflow-hidden bg-slate-900/40 border-b border-raw-border/60"
                >
                  <img
                    [src]="'/images/' + item.imageFileName"
                    [alt]="t('screens.' + item.keyPrefix + 'Title')"
                    class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <!-- Glass Overlay Badge -->
                  <div
                    class="absolute top-3 right-3 px-3 py-1 rounded-full glass border border-white/20 text-[11px] font-extrabold shadow-lg"
                    [class]="item.badgeBg"
                  >
                    {{ item.roleLabelAr }}
                  </div>
                  <!-- Hover Zoom Icon -->
                  <div
                    class="absolute inset-0 bg-blue-900/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  >
                    <span
                      class="px-4 py-2 rounded-2xl glass text-white text-xs font-extrabold shadow-2xl flex items-center gap-2"
                    >
                      🔍 {{ t('screens.viewHighRes') }}
                    </span>
                  </div>
                </div>

                <!-- Text Content -->
                <div class="p-6 space-y-2">
                  <h3
                    class="text-xl font-black text-raw-text group-hover:text-blue-500 transition-colors"
                  >
                    {{ t('screens.' + item.keyPrefix + 'Title') }}
                  </h3>
                  <p class="text-xs sm:text-sm text-raw-text-muted leading-relaxed font-medium">
                    {{ t('screens.' + item.keyPrefix + 'Desc') }}
                  </p>
                </div>
              </div>

              <!-- Footer CTA -->
              <div class="px-6 pb-6 pt-2">
                <button
                  type="button"
                  class="w-full py-3 rounded-2xl bg-raw-surface group-hover:bg-blue-600 group-hover:text-white border border-raw-border text-raw-text text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>{{ t('screens.viewHighRes') }}</span>
                </button>
              </div>
            </div>
          }
        </div>

        <!-- Lightbox High-Res Screen Inspection Modal -->
        @if (activeLightboxScreen()) {
          @let screen = activeLightboxScreen()!;
          <div
            class="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
          >
            <div
              class="glass-card max-w-5xl w-full max-h-[92vh] p-6 sm:p-8 rounded-3xl border border-raw-border shadow-2xl space-y-4 relative overflow-y-auto"
            >
              <!-- Modal Close Button -->
              <button
                type="button"
                (click)="activeLightboxScreen.set(null)"
                class="absolute top-6 right-6 z-100 p-2.5 rounded-full bg-raw-surface border border-raw-border text-raw-text hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <!-- Modal Header -->
              <div class="flex items-center gap-3">
                <span
                  class="px-3.5 py-1 rounded-full text-xs font-black text-white"
                  [class]="screen.badgeBg"
                >
                  {{ screen.roleLabelAr }}
                </span>
                <h3 class="text-2xl font-black text-raw-text">
                  {{ t('screens.' + screen.keyPrefix + 'Title') }}
                </h3>
              </div>

              <p class="text-sm text-raw-text-muted">
                {{ t('screens.' + screen.keyPrefix + 'Desc') }}
              </p>

              <!-- Full High-Res Image Container -->
              <div
                class="rounded-2xl overflow-hidden border border-raw-border bg-slate-950 p-2 shadow-2xl"
              >
                <img
                  [src]="'/images/' + screen.imageFileName"
                  [alt]="t('screens.' + screen.keyPrefix + 'Title')"
                  class="w-full h-auto max-h-[70vh] object-contain rounded-xl"
                />
              </div>

              <div class="pt-2 flex justify-end">
                <button
                  type="button"
                  (click)="activeLightboxScreen.set(null)"
                  class="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold text-xs shadow-lg hover:bg-blue-700 transition-all cursor-pointer"
                >
                  {{ t('screens.closeModal') }}
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class ScreensShowcaseComponent {
  private elementRef = inject(ElementRef);

  readonly selectedCategory = signal<string>('all');
  readonly activeLightboxScreen = signal<SystemScreenItem | null>(null);

  readonly allScreens = signal<SystemScreenItem[]>([
    // Doctor Portal Screens
    {
      id: '1',
      imageFileName: 'لوحة تحكم الدكتور.png',
      keyPrefix: 's1',
      category: 'doctor',
      roleLabelAr: '🩺 الطبيب',
      roleLabelEn: 'Doctor Portal',
      badgeBg: 'bg-blue-600 text-white',
    },
    {
      id: '2',
      imageFileName: 'جدول الدكتور.png',
      keyPrefix: 's2',
      category: 'doctor',
      roleLabelAr: '🩺 الطبيب',
      roleLabelEn: 'Doctor Portal',
      badgeBg: 'bg-blue-600 text-white',
    },
    {
      id: '3',
      imageFileName: 'مواعيد الدكتور.png',
      keyPrefix: 's3',
      category: 'doctor',
      roleLabelAr: '🩺 الطبيب',
      roleLabelEn: 'Doctor Portal',
      badgeBg: 'bg-blue-600 text-white',
    },
    {
      id: '4',
      imageFileName: 'إدارة الروشتات الإلكترونية.png',
      keyPrefix: 's4',
      category: 'doctor',
      roleLabelAr: '🩺 الطبيب',
      roleLabelEn: 'Doctor Portal',
      badgeBg: 'bg-blue-600 text-white',
    },
    {
      id: '5',
      imageFileName: 'إدارة طلبات التحاليل الطبية التى يطلبها الاطباء.png',
      keyPrefix: 's5',
      category: 'doctor',
      roleLabelAr: '🩺 الطبيب',
      roleLabelEn: 'Doctor Portal',
      badgeBg: 'bg-blue-600 text-white',
    },
    {
      id: '6',
      imageFileName: 'إدارة طلبات الأشعة والتقارير الت يطلبها الاطباء.png',
      keyPrefix: 's6',
      category: 'doctor',
      roleLabelAr: '🩺 الطبيب',
      roleLabelEn: 'Doctor Portal',
      badgeBg: 'bg-blue-600 text-white',
    },

    // Pharmacist Screens
    {
      id: '7',
      imageFileName: 'لوحة تحكم الصيدلى.png',
      keyPrefix: 's7',
      category: 'pharmacist',
      roleLabelAr: '💊 الصيدلي',
      roleLabelEn: 'Pharmacist Portal',
      badgeBg: 'bg-purple-600 text-white',
    },
    {
      id: '8',
      imageFileName: 'إدارة الصيدلية والمخزون الدوائي.png',
      keyPrefix: 's8',
      category: 'pharmacist',
      roleLabelAr: '💊 الصيدلي',
      roleLabelEn: 'Pharmacist Portal',
      badgeBg: 'bg-purple-600 text-white',
    },
    {
      id: '9',
      imageFileName: 'مخزون الصيدلية والشحنات الدوائية.png',
      keyPrefix: 's9',
      category: 'pharmacist',
      roleLabelAr: '💊 الصيدلي',
      roleLabelEn: 'Pharmacist Portal',
      badgeBg: 'bg-purple-600 text-white',
    },
    {
      id: '10',
      imageFileName: 'الأدوية القريبة من انتهاء الصلاحية.png',
      keyPrefix: 's10',
      category: 'pharmacist',
      roleLabelAr: '💊 الصيدلي',
      roleLabelEn: 'Pharmacist Portal',
      badgeBg: 'bg-rose-600 text-white',
    },

    // Patient Screens
    {
      id: '11',
      imageFileName: 'لوحة تحكم المريض.png',
      keyPrefix: 's11',
      category: 'patient',
      roleLabelAr: '👤 المريض',
      roleLabelEn: 'Patient Portal',
      badgeBg: 'bg-emerald-600 text-white',
    },
    {
      id: '12',
      imageFileName: 'حجز موعد من قبل المريض.png',
      keyPrefix: 's12',
      category: 'patient',
      roleLabelAr: '👤 المريض',
      roleLabelEn: 'Patient Portal',
      badgeBg: 'bg-emerald-600 text-white',
    },
    {
      id: '13',
      imageFileName: 'مواعيد كشفات المريض.png',
      keyPrefix: 's13',
      category: 'patient',
      roleLabelAr: '👤 المريض',
      roleLabelEn: 'Patient Portal',
      badgeBg: 'bg-emerald-600 text-white',
    },
    {
      id: '14',
      imageFileName: 'رشتات المريض.png',
      keyPrefix: 's14',
      category: 'patient',
      roleLabelAr: '👤 المريض',
      roleLabelEn: 'Patient Portal',
      badgeBg: 'bg-emerald-600 text-white',
    },

    // Assistant Screens
    {
      id: '15',
      imageFileName: 'ادارة جدول الدكتور من قبل المساعد.png',
      keyPrefix: 's15',
      category: 'assistant',
      roleLabelAr: '🩺 المساعد الطبي',
      roleLabelEn: 'Assistant Workspace',
      badgeBg: 'bg-amber-600 text-white',
    },
    {
      id: '16',
      imageFileName: 'الدكاتره المسنده للمساعد لادارة الكشفات الطبيه لهم.png',
      keyPrefix: 's16',
      category: 'assistant',
      roleLabelAr: '🩺 المساعد الطبي',
      roleLabelEn: 'Assistant Workspace',
      badgeBg: 'bg-amber-600 text-white',
    },

    // Lab & Radiology Screens
    {
      id: '17',
      imageFileName: 'التحاليل الموجوده فى المعامل.png',
      keyPrefix: 's17',
      category: 'labRadiology',
      roleLabelAr: '🧪 المختبر والأشعة',
      roleLabelEn: 'Lab & Radiology',
      badgeBg: 'bg-cyan-600 text-white',
    },
    {
      id: '18',
      imageFileName: 'الاشعات الموجوده فى المعمل.png',
      keyPrefix: 's18',
      category: 'labRadiology',
      roleLabelAr: '🧪 المختبر والأشعة',
      roleLabelEn: 'Lab & Radiology',
      badgeBg: 'bg-cyan-600 text-white',
    },

    // Notifications Screen
    {
      id: '19',
      imageFileName: 'الاشعارات.png',
      keyPrefix: 's19',
      category: 'notifications',
      roleLabelAr: '🔔 الإشعارات',
      roleLabelEn: 'Notifications',
      badgeBg: 'bg-rose-600 text-white',
    },
  ]);

  readonly filteredScreens = computed(() => {
    const cat = this.selectedCategory();
    const list = this.allScreens();
    if (cat === 'all') return list;
    return list.filter((item) => item.category === cat);
  });

  selectCategory(category: string): void {
    this.selectedCategory.set(category);

    // GSAP animation for grid refresh
    setTimeout(() => {
      const cards = this.elementRef.nativeElement.querySelectorAll('.screen-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        );
      }
    }, 20);
  }
}
