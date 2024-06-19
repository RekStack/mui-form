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
import { useAsyncFieldControllerLabels, useFieldControllerLabels, useFieldControllerWithOptionsLabels } from '../hooks';
import { useMemo } from 'react';
import type {
  AsyncFieldControllerProps,
  FieldControllerProps,
  FieldControllerWithOptionsProps,
  ObjectLike,
} from '../types';
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

export interface SelectControllerProps<FV extends FieldValues, Value extends ObjectLike>
  extends FieldControllerProps<FV>,
    AsyncFieldControllerProps,
    FieldControllerWithOptionsProps<Value>,
    Omit<SelectProps, 'renderValue' | 'label' | 'name' | 'error'> {
  muiProps?: MuiProps;
  optionValueAccessor: (value: Value) => string | number;
  optionLabelAccessor: (value: Value) => string;
  // FIXME: find a shorter name
  /**
   * Defaults `true`
   */
  displayExtraLabelWhenValueSelected?: boolean;
  optionExtraLabelAccessor?: (value: Value) => string;
}

export const SelectController = <FV extends FieldValues, Value extends ObjectLike>({
  control,
  label,
  name,
  optional = false,
  muiProps,
  requiredLabel,
  onErrorMessage,
  options,
  optionLabelAccessor,
  optionValueAccessor,
  displayExtraLabelWhenValueSelected = true,
  optionExtraLabelAccessor,
  loadingErrorLabel,
  loading = false,
  loadingLabel,
  loadingError = false,
  noOptionsLabel,
  ...selectProps
}: SelectControllerProps<FV, Value>) => {
  const { fieldControllerLabel } = useFieldControllerLabels({ label, optional, requiredLabel });
  const { fieldControllerLoadingErrorLabel, fieldControllerLoadingLabel } = useAsyncFieldControllerLabels({
    loadingErrorLabel,
    loadingLabel,
  });
  const { fieldControllerNoOptionsLabel } = useFieldControllerWithOptionsLabels({
    noOptionsLabel,
  });

  const shouldDisplayOptions = useMemo(() => !loading && !loadingError, [loadingError, loading]);

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
          <InputLabel {...muiProps?.inputLabelProps}>{fieldControllerLabel}</InputLabel>
          <Select
            {...field}
            aria-required={optional ? 'false' : 'true'}
            label={fieldControllerLabel}
            renderValue={(selected) => {
              const found = options?.find((option) => optionValueAccessor(option) === selected);

              if (found) {
                if (optionExtraLabelAccessor?.(found) && displayExtraLabelWhenValueSelected) {
                  return `${optionLabelAccessor(found)}, ${optionExtraLabelAccessor(found)}`;
                }

                return optionLabelAccessor(found);
              }

              return '';
            }}
            {...selectProps}
          >
            {loading && (
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
                  <Typography {...muiProps?.loadingTypographyProps}>{fieldControllerLoadingLabel}</Typography>
                  <CircularProgress
                    size={30}
                    {...muiProps?.loadingCircularProgressProps}
                  />
                </Stack>
              </MenuItem>
            )}
            {loadingError && (
              <MenuItem
                {...muiProps?.errorMenuItemProps}
                disabled
              >
                <Typography {...muiProps?.errorTypographyProps}>{fieldControllerLoadingErrorLabel}</Typography>
              </MenuItem>
            )}
            {shouldDisplayOptions && options?.length === 0 && (
              <MenuItem
                disabled
                {...muiProps?.noOptionsMenuItemProps}
              >
                <Typography {...muiProps?.noOptionsTypographyProps}>{fieldControllerNoOptionsLabel}</Typography>
              </MenuItem>
            )}
            {shouldDisplayOptions &&
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
