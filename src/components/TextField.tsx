import { Controller } from 'react-hook-form';
import { TextField as MuiTextField } from '@mui/material';
import { useMuiFormConfig } from '../index';
import type { FieldProps } from '../index';
import type { FieldValues } from 'react-hook-form';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material';

interface MuiProps {
  muiTextFieldProps?: MuiTextFieldProps;
}

export interface TextFieldProps<T extends FieldValues> extends FieldProps<T> {
  muiProps?: MuiProps;
}

export const TextField = <T extends FieldValues>({
  control,
  label,
  name,
  muiProps,
  isOptional = false,
  requiredLabel: inputRequiredLabel,
  onErrorMessage,
}: TextFieldProps<T>) => {
  const { requiredLabel } = useMuiFormConfig();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { invalid, error } }) => (
        <MuiTextField
          {...muiProps?.muiTextFieldProps}
          {...field}
          aria-required={isOptional ? 'false' : 'true'}
          error={invalid}
          helperText={onErrorMessage && error?.message ? onErrorMessage(error.message) : error?.message}
          label={`${label} ${inputRequiredLabel || requiredLabel}`}
        />
      )}
    />
  );
};
