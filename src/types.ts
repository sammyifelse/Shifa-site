export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'doctor' | 'patient';
  registrationNumber: string;
  registrationDate: string;
  diseaseDescription?: string;
}

export interface Patient extends User {
  role: 'patient';
  diseaseDescription: string;
}

export interface Doctor extends User {
  role: 'doctor';
}