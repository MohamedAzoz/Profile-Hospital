import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { gsap } from 'gsap';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-hero',
  imports: [TranslocoDirective],
  template: `
    <section
      id="hero"
      *transloco="let t"
      class="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden hero-glow"
    >
      <!-- Background Ambient Glow Shapes -->
      <div
        class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-162.5 h-95 bg-blue-600/20 dark:bg-blue-500/25 blur-[130px] rounded-full pointer-events-none"
      ></div>
      <div
        class="absolute top-1/3 right-10 w-80 h-80 bg-cyan-400/15 dark:bg-cyan-500/20 blur-[110px] rounded-full pointer-events-none"
      ></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Glassmorphism Badge -->
        <div class="flex justify-center mb-8 hero-badge">
          <div
            class="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass border border-blue-400/30 text-xs sm:text-sm font-bold text-raw-text shadow-lg shadow-blue-500/10 hover:scale-105 transition-transform duration-300"
          >
            <span class="flex h-2.5 w-2.5 relative">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
              ></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>{{ t('hero.badge') }}</span>
          </div>
        </div>

        <!-- Main Headline & Subtitle -->
        <div class="text-center flex flex-col max-w-4xl mx-auto space-y-6 hero-content">
          <!-- Logo Display in Hero -->
          <div class="flex justify-center mb-4 hero-logo">
            <img
              [src]="themeService.theme() === 'dark' ? '/LogoDark.webp' : '/Logo.webp'"
              alt="Full Health Logo"
              class="h-20 sm:h-24 w-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          <h1
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl flex flex-col font-black tracking-tight leading-tight sm:leading-none text-raw-text hero-title"
          >
            <span>{{ t('hero.titlePrefix') }}</span>
            <br class="hidden sm:flex" />
            <span
              class="bg-linear-to-r from-blue-600 via-indigo-500 to-cyan-500 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent"
            >
              {{ t('hero.titleHighlight') }}
            </span>
          </h1>

          <p
            class="text-base sm:text-xl md:text-2xl text-raw-text-muted leading-relaxed max-w-3xl mx-auto font-medium hero-subtitle"
          >
            {{ t('hero.subtitle') }}
          </p>

          <!-- CTA Buttons -->
          <div class="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 hero-cta">
            <a
              href="#screens"
              class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span>{{ t('hero.ctaScreens') }}</span>
            </a>

            <!-- <a
              href="#demo"
              class="w-full sm:w-auto px-8 py-4 rounded-2xl glass border border-raw-border text-raw-text hover:border-blue-500 font-bold text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{{ t('hero.ctaDemo') }}</span>
            </a> -->
          </div>
        </div>

        <!-- Metrics Stats Cards Grid -->
        <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 hero-stats">
          <div class="glass-card p-6 rounded-3xl text-center relative overflow-hidden group">
            <div
              class="absolute -right-6 -bottom-6 w-20 h-20 bg-blue-500/10 rounded-full group-hover:scale-150 transition-transform duration-500"
            ></div>
            <div class="text-2xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">
              {{ t('hero.stat1') }}
            </div>
            <p class="text-xs sm:text-sm font-semibold text-raw-text-muted">
              {{ t('hero.stat1Label') }}
            </p>
          </div>

          <div class="glass-card p-6 rounded-3xl text-center relative overflow-hidden group">
            <div
              class="absolute -right-6 -bottom-6 w-20 h-20 bg-emerald-500/10 rounded-full group-hover:scale-150 transition-transform duration-500"
            ></div>
            <div
              class="text-2xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-1"
            >
              {{ t('hero.stat2') }}
            </div>
            <p class="text-xs sm:text-sm font-semibold text-raw-text-muted">
              {{ t('hero.stat2Label') }}
            </p>
          </div>

          <div class="glass-card p-6 rounded-3xl text-center relative overflow-hidden group">
            <div
              class="absolute -right-6 -bottom-6 w-20 h-20 bg-indigo-500/10 rounded-full group-hover:scale-150 transition-transform duration-500"
            ></div>
            <div
              class="text-2xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1"
            >
              {{ t('hero.stat3') }}
            </div>
            <p class="text-xs sm:text-sm font-semibold text-raw-text-muted">
              {{ t('hero.stat3Label') }}
            </p>
          </div>

          <div class="glass-card p-6 rounded-3xl text-center relative overflow-hidden group">
            <div
              class="absolute -right-6 -bottom-6 w-20 h-20 bg-cyan-500/10 rounded-full group-hover:scale-150 transition-transform duration-500"
            ></div>
            <div class="text-2xl sm:text-4xl font-extrabold text-cyan-600 dark:text-cyan-400 mb-1">
              {{ t('hero.stat4') }}
            </div>
            <p class="text-xs sm:text-sm font-semibold text-raw-text-muted">
              {{ t('hero.stat4Label') }}
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent implements AfterViewInit {
  protected readonly themeService = inject(ThemeService);
  private elementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    const root = this.elementRef.nativeElement;

    // GSAP entrance reveal animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(root.querySelector('.hero-badge'), { y: -20, opacity: 0, duration: 0.6 })
      .from(root.querySelector('.hero-logo'), { scale: 0.8, opacity: 0, duration: 0.6 }, '-=0.3')
      .from(root.querySelector('.hero-title'), { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
      .from(root.querySelector('.hero-subtitle'), { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
      .from(root.querySelector('.hero-cta'), { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
      .from(
        root.querySelectorAll('.hero-stats > div'),
        { y: 40, opacity: 0, duration: 0.7, stagger: 0.1 },
        '-=0.4',
      );
  }
}
