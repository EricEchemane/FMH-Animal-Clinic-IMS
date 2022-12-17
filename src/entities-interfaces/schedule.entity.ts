export type ClinicServices =
  | 'Vaccination'
  | 'Deworming'
  | 'Check-up'
  | 'Treatment'
  | 'Rapid Test Kits'
  | 'Ultrasound'
  | 'X-ray'
  | 'Minor Surgery'
  | 'Pet Grooming'
  | 'Confinement';

export const ClinicServicesArray = [
  'Vaccination',
  'Deworming',
  'Check-up',
  'Treatment',
  'Rapid Test Kits',
  'Ultrasound',
  'X-ray',
  'Minor Surgery',
  'Pet Grooming',
  'Confinement',
];

export interface Schedule {
  id: string;
  date: Date;
  email: string;
  name: string;
  pet_name: string;
  service: ClinicServices;
  concern: string;
  status: 'pending' | 'done' | 'cancelled';
  archived: boolean;
}