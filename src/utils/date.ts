import { PickerValidDate } from '@mui/x-date-pickers';

export const stringToDate = <T>(date: T): null | undefined | PickerValidDate => {
  if (typeof date === 'number' || typeof date === 'string' || date instanceof Date) {
    return new Date(date) as PickerValidDate;
  }

  return null;
};
