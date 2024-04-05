import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';
import { useFieldLabel } from '../index';
import type { FieldProps } from '../index';
import type { FieldValues } from 'react-hook-form';
import type {
  FormControlProps,
  FormHelperTextProps,
  InputLabelProps,
  ListItemTextProps,
  MenuItemProps,
  SelectProps,
} from '@mui/material';

interface Option<V> {
  label: string;
  value: string | number;
  extraLabel?: string;
  // TODO: Change this to have generic and add option to choose the accessor key, accessor value...
  // valueAccessor: (value: V) => string | number | boolean;
  // displayValueAccessor: (value: V) => string | number | boolean;
  // extraDisplayValueAccessor?: (value: V) => string | number | boolean;
}

interface MuiProps {
  formControlProps?: FormControlProps;
  selectProps?: SelectProps;
  inputLabelProps?: InputLabelProps;
  menuItemProps?: MenuItemProps;
  listItemTextProps?: ListItemTextProps;
  formHelperTextProps?: FormHelperTextProps;
}

export interface SelectFieldProps<T extends FieldValues, V extends Record<string, unknown>> extends FieldProps<T> {
  muiProps?: MuiProps;
  // options: Option<V>[];
  options: V[];
  optionValueAccessor: (value: V) => string | number;
  optionLabelAccessor: (value: V) => string;
  optionExtraLabelAccessor?: (value: V) => string;
}

export const SelectField = <T extends FieldValues, V extends Record<string, unknown>>({
  control,
  label,
  name,
  isOptional = false,
  muiProps,
  requiredLabel,
  onErrorMessage,
  options,
  optionLabelAccessor,
  optionValueAccessor,
  optionExtraLabelAccessor,
}: SelectFieldProps<T, V>) => {
  const { fieldLabel } = useFieldLabel({ isOptional, label, requiredLabel });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { invalid, error } }) => (
        <FormControl
          {...muiProps?.formControlProps}
          error={invalid}
          fullWidth
        >
          <InputLabel {...muiProps?.inputLabelProps}>{fieldLabel}</InputLabel>
          <Select
            {...muiProps?.selectProps}
            {...field}
            aria-required={isOptional ? 'false' : 'true'}
            label={fieldLabel}
            renderValue={(selected) => {
              const found = options.find((option) => optionValueAccessor(option) === selected);

              if (found) {
                return optionLabelAccessor(found);
              }

              return '';
            }}
          >
            {options.map((option) => (
              <MenuItem
                {...muiProps?.menuItemProps}
                key={optionValueAccessor(option)}
                value={optionValueAccessor(option)}
              >
                <ListItemText
                  {...muiProps?.listItemTextProps}
                  primary={optionLabelAccessor(option)}
                  secondary={optionExtraLabelAccessor?.(option)}
                />
              </MenuItem>
            ))}
          </Select>
          {invalid && (
            <FormHelperText {...muiProps?.formHelperTextProps}>
              {onErrorMessage && error?.message ? onErrorMessage(error.message) : error?.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
