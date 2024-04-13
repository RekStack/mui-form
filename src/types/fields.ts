import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { ObjectLike } from './utils';

export interface FieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  isOptional?: boolean;
  requiredLabel?: string;
  onErrorMessage?: (error: string) => string;
}

export interface AsyncFieldProps {
  loadingLabel?: string;
  isLoading?: boolean;
  loadingErrorLabel?: string;
  isError?: boolean;
}

export interface FieldWithOptionsProps<V extends ObjectLike> {
  options?: V[];
  noOptionsLabel?: string;
}
