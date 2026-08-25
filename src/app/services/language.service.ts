import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export type LanguageCode = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translocoService = inject(TranslocoService);
  private readonly STORAGE_KEY = 'pulsecare_lang';

  readonly currentLang = signal<LanguageCode>(this.getInitialLang());
  
  readonly isRtl = computed(() => this.currentLang() === 'ar');
  readonly direction = computed<Direction>(() => (this.isRtl() ? 'rtl' : 'ltr'));

  constructor() {
    effect(() => {
      const lang = this.currentLang();
      const dir = this.direction();
      
      this.translocoService.setActiveLang(lang);
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', lang);
      localStorage.setItem(this.STORAGE_KEY, lang);
    });
  }

  toggleLanguage(): void {
    this.currentLang.update(lang => (lang === 'ar' ? 'en' : 'ar'));
  }

  setLanguage(lang: LanguageCode): void {
    this.currentLang.set(lang);
  }

  private getInitialLang(): LanguageCode {
    const saved = localStorage.getItem(this.STORAGE_KEY) as LanguageCode | null;
    if (saved === 'ar' || saved === 'en') {
      return saved;
    }
    return 'ar'; // Default Arabic primary RTL
  }
}
