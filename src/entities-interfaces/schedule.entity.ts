export interface Schedule {
  id: string;
  date: Date;
  email: string;
  name: string;
  pet_name: string;
  service: 'grooming' | 'vet_consultation' | 'others';
  concern: string;
  status: 'pending' | 'done' | 'cancelled';
  archived: boolean;
}