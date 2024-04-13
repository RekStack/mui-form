import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { useAsyncFieldLabels, useFieldLabels, useFieldWithOptionsLabels } from '../index';
import { useMemo } from 'react';
import type { AsyncFieldProps, FieldProps, FieldWithOptionsProps, ObjectLike } from '../index';
import type {
  CircularProgressProps,
  FormControlProps,
  FormHelperTextProps,
  InputLabelProps,
  ListItemTextProps,
  MenuItemProps,
  SelectProps,
  StackProps,
  TypographyProps,
} from '@mui/material';
import type { FieldValues } from 'react-hook-form';

interface MuiProps {
  formControlProps?: FormControlProps;
  selectProps?: SelectProps;
  inputLabelProps?: InputLabelProps;
  menuItemProps?: MenuItemProps;
  loadingMenuItemProps?: MenuItemProps;
  errorMenuItemProps?: MenuItemProps;
  noOptionsMenuItemProps?: MenuItemProps;
  listItemTextProps?: ListItemTextProps;
  formHelperTextProps?: FormHelperTextProps;
  loadingTypographyProps?: TypographyProps;
  errorTypographyProps?: TypographyProps;
  noOptionsTypographyProps?: TypographyProps;
  loadingStackProps?: StackProps;
  loadingCircularProgressProps?: CircularProgressProps;
}

export interface SelectFieldProps<T extends FieldValues, V extends ObjectLike>
  extends FieldProps<T>,
    AsyncFieldProps,
    FieldWithOptionsProps<V> {
  muiProps?: MuiProps;
  optionValueAccessor: (value: V) => string | number;
  optionLabelAccessor: (value: V) => string;
  optionExtraLabelAccessor?: (value: V) => string;
}

export const SelectField = <T extends FieldValues, V extends ObjectLike>({
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
  loadingErrorLabel,
  isLoading = false,
  loadingLabel,
  isError = false,
  noOptionsLabel,
}: SelectFieldProps<T, V>) => {
  const { fieldLabel } = useFieldLabels({ isOptional, label, requiredLabel });
  const { fieldLoadingErrorLabel, fieldLoadingLabel } = useAsyncFieldLabels({ loadingErrorLabel, loadingLabel });
  const { fieldNoOptionsLabel } = useFieldWithOptionsLabels({ noOptionsLabel });

  const displayOptions = useMemo(() => !isLoading && !isError, [isError, isLoading]);

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
              const found = options?.find((option) => optionValueAccessor(option) === selected);

              if (found) {
                return optionLabelAccessor(found);
              }

              return '';
            }}
          >
            {isLoading && (
              <MenuItem
                {...muiProps?.loadingMenuItemProps}
                disabled
              >
                <Stack
                  alignItems='center'
                  flexDirection='row'
                  justifyContent='space-between'
                  width='100%'
                  {...muiProps?.loadingStackProps}
                >
                  <Typography {...muiProps?.loadingTypographyProps}>{fieldLoadingLabel}</Typography>
                  <CircularProgress
                    size={30}
                    {...muiProps?.loadingCircularProgressProps}
                  />
                </Stack>
              </MenuItem>
            )}
            {isError && (
              <MenuItem
                {...muiProps?.errorMenuItemProps}
                disabled
              >
                <Typography {...muiProps?.errorTypographyProps}>{fieldLoadingErrorLabel}</Typography>
              </MenuItem>
            )}
            {displayOptions && options?.length === 0 && (
              <MenuItem
                disabled
                {...muiProps?.noOptionsMenuItemProps}
              >
                <Typography {...muiProps?.noOptionsTypographyProps}>{fieldNoOptionsLabel}</Typography>
              </MenuItem>
            )}
            {displayOptions &&
              options?.map((option) => (
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
