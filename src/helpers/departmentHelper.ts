import { Department } from '../types/index.ts';

export const getDepartment = (department: Department): string => {
  switch (department) {
    case Department.SURGERY:
      return 'Хирургическое';
    case Department.CARDIOLOGY:
      return 'Кардиологическое';
    default:
      return '';
  }
};