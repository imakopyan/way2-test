export interface Doctor {
    id: string;
    name: string;
    department: Department;
    isHead: boolean;
  }
  
  export interface Nurse {
    id: string;
    name: string;
    department: Department;
  }


  export enum Department {
    SURGERY = 'surgery',
    CARDIOLOGY = 'cardiology',
  }