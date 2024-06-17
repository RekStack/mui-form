import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { ObjectLike } from './utils';

export interface FieldControllerProps<FV extends FieldValues> {
  control: Control<FV>;
  name: FieldPath<FV>;
  label: string;
  optional?: boolean;
  disabled?: boolean;
  requiredLabel?: string;
  onErrorMessage?: (error: string) => string;
}

export interface AsyncFieldControllerProps {
  loadingLabel?: string;
  loading?: boolean;
  loadingErrorLabel?: string;
  loadingError?: boolean;
}

export interface FieldControllerWithOptionsProps<Value extends ObjectLike> {
  options: Array<Value>;
  noOptionsLabel?: string;
}
