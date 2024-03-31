import { type Control, Controller, type FieldPath, type FieldValues } from 'react-hook-form';
import { Select } from '@mui/material';
import type { SelectProps } from '@mui/material';

// TODO: Change this to have generic and add option to choose the accessor key...
interface Option {
  label: string;
  value: string | number | boolean;
}

// TODO: Make this interface a generic one
interface MuiProps {
  muiSelectProps?: SelectProps;
}

export interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  isOptional?: boolean;
  muiProps: MuiProps;
}

export const SelectField = <T extends FieldValues>({
  control,
  label,
  name,
  isOptional = false,
  muiProps,
}: SelectFieldProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState: { invalid, error } }) => (
      <Select
        {...muiProps.muiSelectProps}
        {...field}
        // TODO: Add all aria labels needed (could be a custom hook/function)
        aria-required={isOptional ? 'false' : 'true'}
        error={invalid}
        // TODO: Add options to manipulate error messages maybe a options function prop `(error) => string`, if undefined use the `error.message` value
        // helperText={error?.message}
        label={label}
      />
    )}
  />
);
