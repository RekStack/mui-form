import { Control, FieldPath, FieldValues } from 'react-hook-form';

export interface FieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  isOptional?: boolean;
  requiredLabel?: string;
  onErrorMessage?: (error: string) => string;
}
