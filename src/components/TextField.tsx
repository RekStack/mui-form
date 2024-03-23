import { type Control, Controller, type FieldPath, type FieldValues } from 'react-hook-form';
import { TextField as MuiTextField } from '@mui/material';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material';

// TODO: Make this interface a generic one
interface MuiProps {
  muiTextFieldProps?: MuiTextFieldProps;
}

export interface TextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  isOptional?: boolean;
  muiProps?: MuiProps;
}

export const TextField = <T extends FieldValues>({
  control,
  label,
  name,
  isOptional = false,
  muiProps,
}: TextFieldProps<T>) => (
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
        label={label}
      />
    )}
  />
);
