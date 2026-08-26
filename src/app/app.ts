import { Component, inject } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ArchitectureMetricsComponent } from './components/architecture-metrics/architecture-metrics.component';
import { ScreensShowcaseComponent } from './components/screens-showcase/screens-showcase.component';
import { ModulesGridComponent } from './components/modules-grid/modules-grid.component';
import { LivePreviewSimulatorComponent } from './components/live-preview-simulator/live-preview-simulator.component';
import { TechnicalSpecsComponent } from './components/technical-specs/technical-specs.component';
import { FooterComponent } from './components/footer/footer.component';
import { LanguageService } from './services/language.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroComponent,
    ArchitectureMetricsComponent,
    ScreensShowcaseComponent,
    ModulesGridComponent,
    // LivePreviewSimulatorComponent,
    TechnicalSpecsComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    '[attr.dir]': 'langService.direction()',
    '[attr.lang]': 'langService.currentLang()',
    '[class.dark]': 'themeService.theme() === "dark"'
  }
})
export class App {
  protected readonly langService = inject(LanguageService);
  protected readonly themeService = inject(ThemeService);
}
