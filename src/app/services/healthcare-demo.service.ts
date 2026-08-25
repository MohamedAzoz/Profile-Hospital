import { Injectable, signal, computed, linkedSignal } from '@angular/core';

export interface PrescriptionItem {
  id: string;
  name: string;
  dosage: string;
  time: string;
}

export interface PatientQueueItem {
  ticketNumber: number;
  nameAr: string;
  nameEn: string;
  clinicAr: string;
  clinicEn: string;
  status: 'calling' | 'waiting' | 'completed';
}

@Injectable({ providedIn: 'root' })
export class HealthcareDemoService {
  // Live Patient Queue State
  readonly ticketCounter = signal<number>(104);
  readonly currentCallingTicket = signal<number>(103);
  
  readonly queueList = signal<PatientQueueItem[]>([
    { ticketNumber: 101, nameAr: 'محمد أحمد العتيبي', nameEn: 'Mohammed Al-Otaibi', clinicAr: 'عيادة الباطنية', clinicEn: 'Internal Medicine', status: 'completed' },
    { ticketNumber: 102, nameAr: 'سارة خالد المنصور', nameEn: 'Sarah Al-Mansoor', clinicAr: 'عيادة العظام', clinicEn: 'Orthopedics', status: 'completed' },
    { ticketNumber: 103, nameAr: 'عبدالله يوسف علي', nameEn: 'Abdullah Youssef', clinicAr: 'عيادة القلب', clinicEn: 'Cardiology', status: 'calling' },
    { ticketNumber: 104, nameAr: 'فاطمة عمر الشمري', nameEn: 'Fatima Al-Shammari', clinicAr: 'عيادة الأطفال', clinicEn: 'Pediatrics', status: 'waiting' },
    { ticketNumber: 105, nameAr: 'خالد إبراهيم حسن', nameEn: 'Khaled Ibrahim', clinicAr: 'عيادة العيون', clinicEn: 'Ophthalmology', status: 'waiting' },
  ]);

  readonly nextPatientInQueue = computed(() => {
    return this.queueList().find(p => p.status === 'waiting') || null;
  });

  readonly callingPatient = computed(() => {
    return this.queueList().find(p => p.status === 'calling') || null;
  });

  // Vitals Monitor State (Zoneless Stream simulation)
  readonly heartRate = signal<number>(72);
  readonly bloodPressureSys = signal<number>(120);
  readonly bloodPressureDia = signal<number>(80);
  readonly oxygenSaturation = signal<number>(98);
  readonly lastVitalsUpdate = signal<Date>(new Date());

  // Prescription Builder State
  readonly prescriptions = signal<PrescriptionItem[]>([
    { id: '1', name: 'Paracetamol 500mg', dosage: '1 tablet / 8 hours', time: '10:30 AM' },
    { id: '2', name: 'Amoxicillin 500mg', dosage: '1 capsule / 12 hours', time: '10:31 AM' },
  ]);
  readonly isPrescriptionSynced = signal<boolean>(false);

  // Computed Derived States
  readonly totalPrescribedMeds = computed(() => this.prescriptions().length);

  // linkedSignal example: synchronized search filter selection linked to category filter
  readonly selectedCategory = signal<string>('all');
  readonly searchQuery = signal<string>('');
  
  // Method to simulate patient queue advancement
  callNextPatient(): void {
    const queue = this.queueList();
    const callingIndex = queue.findIndex(p => p.status === 'calling');
    const waitingIndex = queue.findIndex(p => p.status === 'waiting');

    const updated = queue.map((patient, idx) => {
      if (idx === callingIndex) {
        return { ...patient, status: 'completed' as const };
      }
      if (idx === waitingIndex) {
        return { ...patient, status: 'calling' as const };
      }
      return patient;
    });

    if (waitingIndex !== -1) {
      this.currentCallingTicket.set(queue[waitingIndex].ticketNumber);
    } else {
      // Add a new random generated patient to keep demo infinite
      const newNum = this.ticketCounter() + 1;
      this.ticketCounter.set(newNum);
      updated.push({
        ticketNumber: newNum,
        nameAr: `مريض رقم #${newNum}`,
        nameEn: `Patient #${newNum}`,
        clinicAr: 'العيادات الخارجية',
        clinicEn: 'Outpatient Clinic',
        status: 'calling'
      });
      this.currentCallingTicket.set(newNum);
    }

    this.queueList.set(updated);
  }

  resetQueue(): void {
    this.ticketCounter.set(104);
    this.currentCallingTicket.set(103);
    this.queueList.set([
      { ticketNumber: 101, nameAr: 'محمد أحمد العتيبي', nameEn: 'Mohammed Al-Otaibi', clinicAr: 'عيادة الباطنية', clinicEn: 'Internal Medicine', status: 'completed' },
      { ticketNumber: 102, nameAr: 'سارة خالد المنصور', nameEn: 'Sarah Al-Mansoor', clinicAr: 'عيادة العظام', clinicEn: 'Orthopedics', status: 'completed' },
      { ticketNumber: 103, nameAr: 'عبدالله يوسف علي', nameEn: 'Abdullah Youssef', clinicAr: 'عيادة القلب', clinicEn: 'Cardiology', status: 'calling' },
      { ticketNumber: 104, nameAr: 'فاطمة عمر الشمري', nameEn: 'Fatima Al-Shammari', clinicAr: 'عيادة الأطفال', clinicEn: 'Pediatrics', status: 'waiting' },
      { ticketNumber: 105, nameAr: 'خالد إبراهيم حسن', nameEn: 'Khaled Ibrahim', clinicAr: 'عيادة العيون', clinicEn: 'Ophthalmology', status: 'waiting' },
    ]);
  }

  // Method to simulate vitals variation
  simulateVitalsSpike(): void {
    const randomHr = Math.floor(Math.random() * (105 - 68 + 1)) + 68;
    const randomSys = Math.floor(Math.random() * (138 - 115 + 1)) + 115;
    const randomDia = Math.floor(Math.random() * (90 - 75 + 1)) + 75;
    const randomSpo2 = Math.floor(Math.random() * (100 - 96 + 1)) + 96;

    this.heartRate.set(randomHr);
    this.bloodPressureSys.set(randomSys);
    this.bloodPressureDia.set(randomDia);
    this.oxygenSaturation.set(randomSpo2);
    this.lastVitalsUpdate.set(new Date());
  }

  // Prescription methods
  addPrescription(name: string, dosage: string): void {
    if (!name.trim()) return;
    const newItem: PrescriptionItem = {
      id: Date.now().toString(),
      name: name.trim(),
      dosage: dosage.trim() || '1 tablet daily',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.prescriptions.update(prev => [...prev, newItem]);
    this.isPrescriptionSynced.set(false);
  }

  removePrescription(id: string): void {
    this.prescriptions.update(prev => prev.filter(item => item.id !== id));
  }

  syncPrescriptionToPharmacy(): void {
    this.isPrescriptionSynced.set(true);
    setTimeout(() => {
      this.isPrescriptionSynced.set(false);
    }, 4000);
  }
}
