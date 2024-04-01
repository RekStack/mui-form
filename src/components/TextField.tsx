import { Controller } from 'react-hook-form';
import { TextField as MuiTextField } from '@mui/material';
import { useMuiFormConfig } from '../index';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material';

// TODO: Make this interface a generic one
interface MuiProps {
  muiTextFieldProps?: MuiTextFieldProps;
}

export interface TextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  muiProps?: MuiProps;
  isOptional?: boolean;
  requiredLabel?: string;
}

export const TextField = <T extends FieldValues>({
  control,
  label,
  name,
  muiProps,
  isOptional = false,
  requiredLabel: inputRequiredLabel,
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
          // TODO: Add all aria labels needed (could be a custom hook/function)
          aria-required={isOptional ? 'false' : 'true'}
          error={invalid}
          // TODO: Add options to manipulate error messages maybe a options function prop `(error) => string`, if undefined use the `error.message` value
          helperText={error?.message}
          label={`${label} ${inputRequiredLabel || requiredLabel}`}
        />
      )}
    />
  );
};
