import { Component, inject, signal } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { HealthcareDemoService } from '../../services/healthcare-demo.service';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-live-preview-simulator',
  imports: [TranslocoDirective],
  template: `
    <section
      id="demo"
      *transloco="let t"
      class="py-24 relative overflow-hidden bg-linear-to-b from-blue-900/10 via-transparent to-transparent"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto space-y-4 flex flex-col items-center mb-16">
          <span
            class="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700"
          >
            {{ t('preview.tag') }}
          </span>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-raw-text tracking-tight">
            {{ t('preview.title') }}
          </h2>
          <p class="text-base sm:text-lg text-raw-text-muted">
            {{ t('preview.subtitle') }}
          </p>
        </div>

        <!-- Live Mockup Dashboard Container -->
        <div
          class="glass-card rounded-3xl p-6 sm:p-10 border border-raw-border shadow-2xl space-y-8"
        >
          <!-- Mock Window Titlebar -->
          <div class="flex items-center justify-between pb-6 border-b border-raw-border">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded-full bg-rose-500"></span>
                <span class="w-3 h-3 rounded-full bg-amber-500"></span>
                <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
              </div>
              <span class="text-xs sm:text-sm font-bold text-raw-text tracking-wide">
                Full Health Live Console — [{{ langService.currentLang().toUpperCase() }} |
                {{ themeService.theme().toUpperCase() }}]
              </span>
            </div>

            <div
              class="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20"
            >
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live Console Active</span>
            </div>
          </div>

          <!-- Interactive Grid: Queue, Vitals, Prescription Engine -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Panel 1: Live Patient Calling Queue Display -->
            <div
              class="glass p-6 rounded-2xl border border-raw-border space-y-6 flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-extrabold text-raw-text flex items-center gap-2">
                    <span>⏱️</span>
                    <span>{{ t('preview.liveQueueTitle') }}</span>
                  </h3>
                  <span
                    class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-300"
                  >
                    Live Queue
                  </span>
                </div>

                <!-- Current Calling Ticket Box -->
                <div
                  class="mt-6 p-6 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white text-center shadow-lg relative overflow-hidden"
                >
                  <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full"></div>
                  <p class="text-xs font-medium text-blue-100 uppercase tracking-wider mb-1">
                    {{ t('preview.currentCalling') }}
                  </p>
                  <div class="text-5xl font-black tracking-widest my-2 animate-pulse">
                    #{{ demoService.currentCallingTicket() }}
                  </div>
                  @if (demoService.callingPatient(); as patient) {
                    <p class="text-sm font-bold text-white">
                      {{ langService.isRtl() ? patient.nameAr : patient.nameEn }}
                    </p>
                    <p class="text-xs text-blue-200">
                      {{ langService.isRtl() ? patient.clinicAr : patient.clinicEn }}
                    </p>
                  }
                </div>

                <!-- Next Patient in Queue -->
                <div
                  class="mt-4 p-4 rounded-xl bg-raw-surface border border-raw-border flex items-center justify-between"
                >
                  <div>
                    <span class="text-xs text-raw-text-muted block">{{
                      t('preview.nextPatient')
                    }}</span>
                    @if (demoService.nextPatientInQueue(); as nextP) {
                      <span class="text-sm font-bold text-raw-text">
                        #{{ nextP.ticketNumber }} —
                        {{ langService.isRtl() ? nextP.nameAr : nextP.nameEn }}
                      </span>
                    } @else {
                      <span class="text-xs text-raw-text-muted">No waiting patients</span>
                    }
                  </div>
                  <span
                    class="text-xs font-semibold px-2 py-1 rounded bg-blue-500/10 text-blue-600"
                  >
                    Waiting
                  </span>
                </div>
              </div>

              <!-- Interactive Call Controls -->
              <div class="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  (click)="demoService.callNextPatient()"
                  class="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{{ t('preview.callNext') }}</span>
                </button>
                <button
                  type="button"
                  (click)="demoService.resetQueue()"
                  class="p-3 rounded-xl bg-raw-surface border border-raw-border text-raw-text hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                  [attr.title]="t('preview.resetQueue')"
                >
                  🔄
                </button>
              </div>
            </div>

            <!-- Panel 2: Live Vitals Monitor Stream -->
            <div
              class="glass p-6 rounded-2xl border border-raw-border space-y-6 flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-extrabold text-raw-text flex items-center gap-2">
                    <span>🩺</span>
                    <span>{{ t('preview.vitalsTitle') }}</span>
                  </h3>
                  <span
                    class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 animate-pulse"
                  >
                    ECG Live
                  </span>
                </div>

                <!-- Heart Rate Counter Box -->
                <div
                  class="p-4 rounded-2xl bg-raw-surface border border-raw-border flex items-center justify-between mb-4 shadow-sm"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-2xl animate-bounce"
                    >
                      ❤️
                    </div>
                    <div>
                      <span class="text-xs text-raw-text-muted block">{{
                        t('preview.heartRate')
                      }}</span>
                      <span class="text-2xl font-black text-rose-600 dark:text-rose-400">
                        {{ demoService.heartRate() }}
                      </span>
                      <span class="text-xs text-raw-text-muted ml-1">{{ t('preview.bpm') }}</span>
                    </div>
                  </div>
                  <span
                    class="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300"
                  >
                    Normal
                  </span>
                </div>

                <!-- Blood Pressure & Spo2 Grid -->
                <div class="grid grid-cols-2 gap-3 mb-4">
                  <div class="p-4 rounded-2xl bg-raw-surface border border-raw-border">
                    <span class="text-xs text-raw-text-muted block">{{
                      t('preview.bloodPressure')
                    }}</span>
                    <span class="text-xl font-extrabold text-raw-text">
                      {{ demoService.bloodPressureSys() }}/{{ demoService.bloodPressureDia() }}
                    </span>
                    <span class="text-[10px] text-raw-text-muted block mt-0.5">{{
                      t('preview.sysDia')
                    }}</span>
                  </div>

                  <div class="p-4 rounded-2xl bg-raw-surface border border-raw-border">
                    <span class="text-xs text-raw-text-muted block">{{ t('preview.oxygen') }}</span>
                    <span class="text-xl font-extrabold text-cyan-600 dark:text-cyan-400">
                      {{ demoService.oxygenSaturation() }}%
                    </span>
                    <span class="text-[10px] text-raw-text-muted block mt-0.5">{{
                      t('preview.oxygenVal')
                    }}</span>
                  </div>
                </div>

                <!-- Animated ECG Wave Canvas Bar -->
                <div
                  class="h-10 w-full rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-between px-4 overflow-hidden"
                >
                  <span class="text-[10px] font-mono text-emerald-400">ECG Lead II</span>
                  <div class="flex items-center gap-1">
                    <span class="w-1.5 h-4 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span class="w-1.5 h-7 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span class="w-1.5 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span class="w-1.5 h-8 bg-emerald-300 rounded-full animate-pulse"></span>
                    <span class="w-1.5 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </div>

              <!-- Simulator Action Trigger -->
              <button
                type="button"
                (click)="demoService.simulateVitalsSpike()"
                class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>⚡ {{ t('preview.pulseSimulate') }}</span>
              </button>
            </div>

            <!-- Panel 3: Smart E-Prescription Builder -->
            <div
              class="glass p-6 rounded-2xl border border-raw-border space-y-6 flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-extrabold text-raw-text flex items-center gap-2">
                    <span>💊</span>
                    <span>{{ t('preview.rxTitle') }}</span>
                  </h3>
                  <span
                    class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-600 dark:text-purple-300"
                  >
                    Rx Engine
                  </span>
                </div>

                <!-- Drug Input Form -->
                <div class="space-y-2 mb-4">
                  <input
                    type="text"
                    [value]="medName()"
                    (input)="medName.set($any($event.target).value)"
                    [placeholder]="t('preview.medication')"
                    class="w-full px-3.5 py-2 rounded-xl bg-raw-surface border border-raw-border text-xs text-raw-text focus:outline-none focus:border-blue-500"
                  />
                  <div class="flex gap-2">
                    <input
                      type="text"
                      [value]="medDosage()"
                      (input)="medDosage.set($any($event.target).value)"
                      [placeholder]="t('preview.dosage')"
                      class="flex-1 px-3.5 py-2 rounded-xl bg-raw-surface border border-raw-border text-xs text-raw-text focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      (click)="onAddDrug()"
                      class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow cursor-pointer whitespace-nowrap"
                    >
                      + {{ t('preview.addDrug') }}
                    </button>
                  </div>
                </div>

                <!-- Prescribed Items List -->
                <div class="space-y-2 max-h-44 overflow-y-auto pr-1">
                  <span class="text-xs font-semibold text-raw-text-muted block">
                    {{ t('preview.rxItems') }} ({{ demoService.totalPrescribedMeds() }})
                  </span>

                  @if (demoService.prescriptions().length === 0) {
                    <p class="text-xs text-raw-text-muted italic py-4 text-center">
                      {{ t('preview.emptyRx') }}
                    </p>
                  } @else {
                    @for (item of demoService.prescriptions(); track item.id) {
                      <div
                        class="p-2.5 rounded-xl bg-raw-surface border border-raw-border flex items-center justify-between text-xs"
                      >
                        <div>
                          <span class="font-bold text-raw-text block">{{ item.name }}</span>
                          <span class="text-[10px] text-raw-text-muted">{{ item.dosage }}</span>
                        </div>
                        <button
                          type="button"
                          (click)="demoService.removePrescription(item.id)"
                          class="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    }
                  }
                </div>
              </div>

              <!-- Sync Button -->
              <div class="space-y-2">
                @if (demoService.isPrescriptionSynced()) {
                  <div
                    class="p-3 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold text-center border border-emerald-500/30 animate-in fade-in"
                  >
                    ✅ {{ t('preview.syncSuccess') }}
                  </div>
                }

                <button
                  type="button"
                  (click)="demoService.syncPrescriptionToPharmacy()"
                  [disabled]="demoService.prescriptions().length === 0"
                  class="w-full py-3 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  {{ t('preview.syncRx') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class LivePreviewSimulatorComponent {
  protected readonly demoService = inject(HealthcareDemoService);
  protected readonly langService = inject(LanguageService);
  protected readonly themeService = inject(ThemeService);

  readonly medName = signal<string>('');
  readonly medDosage = signal<string>('');

  onAddDrug(): void {
    if (!this.medName().trim()) return;
    this.demoService.addPrescription(this.medName(), this.medDosage());
    this.medName.set('');
    this.medDosage.set('');
  }
}
