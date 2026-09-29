export type Language = 'ar' | 'fr';

export type NavTab = 
  | 'home'
  | 'sos'
  | 'laissez_passer'
  | 'legal'
  | 'civil_status'
  | 'healthcare'
  | 'contacts'
  | 'vault';

export interface ConsularDocumentItem {
  id: string;
  titleAr: string;
  titleFr: string;
  category: 'laissez_passer' | 'passport' | 'immatriculation' | 'loss_theft';
  descriptionAr: string;
  descriptionFr: string;
  requirementsAr: string[];
  requirementsFr: string[];
  processingTimeAr: string;
  processingTimeFr: string;
  validityAr: string;
  validityFr: string;
  costAr: string;
  costFr: string;
  urgentNoteAr?: string;
  urgentNoteFr?: string;
}

export interface LegalInquiry {
  id: string;
  date: string;
  fullName: string;
  isAnonymous: boolean;
  phone: string;
  wilaya: string;
  category: 'regularization' | 'detention' | 'work_dispute' | 'lost_papers' | 'humanitarian' | 'other';
  description: string;
  status: 'pending' | 'submitted';
}

export interface NewbornRegistration {
  id: string;
  date: string;
  childName: string;
  gender: 'male' | 'female';
  birthDate: string;
  birthPlace: string; // e.g. EPH Tamanrasset, Clinique Tahabort, etc.
  fatherName: string;
  fatherNationality: string;
  motherName: string;
  motherNationality: string;
  phone: string;
  hospitalCertificateNumber: string;
  status: 'recorded' | 'synced';
}

export interface EmergencyContact {
  id: string;
  nameAr: string;
  nameFr: string;
  number: string;
  type: 'consular' | 'algerian_emergency' | 'hospital' | 'red_crescent';
  descriptionAr: string;
  descriptionFr: string;
  available: string;
}
