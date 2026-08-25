import { Component, inject, signal } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  imports: [TranslocoDirective],
  template: `
    <nav
      *transloco="let t"
      class="sticky top-0 z-50 glass backdrop-blur-xl border-b border-raw-border transition-colors duration-300"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Brand Logo & Title -->
          <div class="flex items-center gap-3">
            <div
              class="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-tr from-blue-600 via-indigo-600 to-cyan-500 shadow-lg shadow-blue-500/30 text-white font-bold text-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.595 15.12a2 2 0 00-1.806.547M12 4.5v15m-7.5-7.5h15"
                />
              </svg>
              <span class="absolute -top-1 -right-1 flex h-3 w-3">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                ></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div class="flex items-center gap-2">
                <span
                  class="text-xl font-extrabold tracking-tight bg-linear-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400"
                >
                  {{ t('nav.brand') }}
                </span>
                <span
                  class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 border border-blue-300 dark:border-blue-700/50"
                >
                  {{ t('nav.tag') }}
                </span>
              </div>
              <p class="text-xs text-raw-text-muted hidden sm:block">
                {{ t('nav.systemActive') }}
              </p>
            </div>
          </div>

          <!-- Center Navigation Links -->
          <div
            class="hidden md:flex items-center gap-1 bg-slate-200/50 dark:bg-slate-800/60 p-1.5 rounded-full border border-raw-border backdrop-blur-md"
          >
            <a
              href="#hero"
              class="px-4 py-2 text-sm font-medium rounded-full text-raw-text hover:bg-raw-surface hover:shadow-sm transition-all"
            >
              {{ t('nav.home') }}
            </a>
            <a
              href="#capabilities"
              class="px-4 py-2 text-sm font-medium rounded-full text-raw-text hover:bg-raw-surface hover:shadow-sm transition-all"
            >
              {{ t('nav.capabilities') }}
            </a>
            <a
              href="#modules"
              class="px-4 py-2 text-sm font-medium rounded-full text-raw-text hover:bg-raw-surface hover:shadow-sm transition-all"
            >
              {{ t('nav.modules') }}
            </a>
            <a
              href="#demo"
              class="px-4 py-2 text-sm font-medium rounded-full text-raw-text hover:bg-raw-surface hover:shadow-sm transition-all"
            >
              {{ t('nav.demo') }}
            </a>
            <a
              href="#specs"
              class="px-4 py-2 text-sm font-medium rounded-full text-raw-text hover:bg-raw-surface hover:shadow-sm transition-all"
            >
              {{ t('nav.specs') }}
            </a>
          </div>

          <!-- Controls: Theme & Language Switcher -->
          <div class="flex items-center gap-3">
            <!-- Language Switcher Button -->
            <button
              type="button"
              (click)="langService.toggleLanguage()"
              class="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-raw-surface text-raw-text border border-raw-border shadow-sm hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer"
              [attr.aria-label]="'Switch Language'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              <span>{{
                langService.currentLang() === 'ar' ? 'English (LTR)' : 'العربية (RTL)'
              }}</span>
            </button>

            <!-- Dark / Light Mode Toggle Button -->
            <button
              type="button"
              (click)="themeService.toggleTheme()"
              class="p-2.5 rounded-xl bg-raw-surface text-raw-text border border-raw-border shadow-sm hover:border-amber-400 hover:text-amber-500 dark:hover:text-amber-400 transition-all cursor-pointer"
              [attr.aria-label]="
                themeService.theme() === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
              "
            >
              @if (themeService.theme() === 'dark') {
                <!-- Sun Icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              } @else {
                <!-- Moon Icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-slate-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              }
            </button>

            <!-- Mobile Menu Toggle Button -->
            <button
              type="button"
              (click)="mobileMenuOpen.set(!mobileMenuOpen())"
              class="md:hidden p-2 rounded-lg bg-raw-surface border border-raw-border text-raw-text cursor-pointer"
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
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Menu -->
        @if (mobileMenuOpen()) {
          <div
            class="md:hidden py-4 px-2 space-y-2 border-t border-raw-border bg-raw-surface rounded-b-2xl shadow-xl"
          >
            <a
              href="#hero"
              (click)="mobileMenuOpen.set(false)"
              class="block px-4 py-2.5 text-sm font-medium rounded-lg text-raw-text hover:bg-blue-500/10"
            >
              {{ t('nav.home') }}
            </a>
            <a
              href="#capabilities"
              (click)="mobileMenuOpen.set(false)"
              class="block px-4 py-2.5 text-sm font-medium rounded-lg text-raw-text hover:bg-blue-500/10"
            >
              {{ t('nav.capabilities') }}
            </a>
            <a
              href="#modules"
              (click)="mobileMenuOpen.set(false)"
              class="block px-4 py-2.5 text-sm font-medium rounded-lg text-raw-text hover:bg-blue-500/10"
            >
              {{ t('nav.modules') }}
            </a>
            <a
              href="#demo"
              (click)="mobileMenuOpen.set(false)"
              class="block px-4 py-2.5 text-sm font-medium rounded-lg text-raw-text hover:bg-blue-500/10"
            >
              {{ t('nav.demo') }}
            </a>
            <a
              href="#specs"
              (click)="mobileMenuOpen.set(false)"
              class="block px-4 py-2.5 text-sm font-medium rounded-lg text-raw-text hover:bg-blue-500/10"
            >
              {{ t('nav.specs') }}
            </a>
          </div>
        }
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  protected readonly themeService = inject(ThemeService);
  protected readonly langService = inject(LanguageService);
  protected readonly mobileMenuOpen = signal<boolean>(false);
}
