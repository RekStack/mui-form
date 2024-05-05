import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useAsyncFieldControllerLabels, useFieldControllerLabels, useFieldControllerWithOptionsLabels } from '../index';
import { useState } from 'react';
import type {
  AsyncFieldControllerProps,
  FieldControllerProps,
  FieldControllerWithOptionsProps,
  ObjectLike,
} from '../index';
import type { AutocompleteProps, AutocompleteValue, ChipTypeMap, TextFieldProps } from '@mui/material';
import type { FieldValues } from 'react-hook-form';

interface MuiProps {
  textField?: TextFieldProps;
}

// TODO:
// Add built in throttle on async search (default no throttle)
export interface AutocompleteControllerProps<
  FV extends FieldValues,
  Value extends ObjectLike,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
> extends FieldControllerProps<FV>,
    AsyncFieldControllerProps,
    FieldControllerWithOptionsProps<Value>,
    Omit<
      AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>,
      'options' | 'renderInput' | 'value' | 'noOptionsText' | 'loadingText' | 'name'
    > {
  muiProps?: MuiProps;
  initialValue?: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>;
  optionValueAccessor: (
    value: Value | AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>,
  ) => string | number;
}

export const AutocompleteController = <
  FV extends FieldValues,
  Value extends ObjectLike,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
>({
  control,
  label,
  name,
  optional = false,
  muiProps,
  requiredLabel,
  onErrorMessage,
  options,
  loadingErrorLabel,
  loadingLabel,
  loadingError = false,
  noOptionsLabel,
  initialValue,
  optionValueAccessor,
  // Autocomplete props
  getOptionLabel,
  isOptionEqualToValue,
  loading,
  ...autocompleteProps
}: AutocompleteControllerProps<FV, Value, Multiple, DisableClearable, FreeSolo, ChipComponent>) => {
  const { fieldControllerLabel } = useFieldControllerLabels({ label, optional, requiredLabel });
  const { fieldControllerLoadingErrorLabel, fieldControllerLoadingLabel } = useAsyncFieldControllerLabels({
    loadingErrorLabel,
    loadingLabel,
  });
  const { fieldControllerNoOptionsLabel } = useFieldControllerWithOptionsLabels({
    noOptionsLabel,
  });
  const [selectedValue, setSelectedValue] = useState<AutocompleteValue<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo
  > | null>(initialValue ?? null);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...other }, fieldState: { invalid, error } }) => (
        <Autocomplete
          {...other}
          aria-required={optional ? 'false' : 'true'}
          getOptionLabel={(value) => {
            if (!value) {
              return '';
            } else if (getOptionLabel) {
              return getOptionLabel(value);
            }

            return '';
          }}
          isOptionEqualToValue={(option, value) => {
            if (!value) {
              return false;
            } else if (isOptionEqualToValue) {
              return isOptionEqualToValue(option, value);
            }

            return false;
          }}
          loading={loading}
          loadingText={fieldControllerLoadingLabel}
          noOptionsText={loadingError ? fieldControllerLoadingErrorLabel : fieldControllerNoOptionsLabel}
          onChange={(_: unknown, newValue) => {
            setSelectedValue(newValue ?? null);
            onChange(optionValueAccessor(newValue));
          }}
          options={options ?? []}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress
                        color='primary'
                        size={20}
                      />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              {...muiProps?.textField}
              error={invalid}
              helperText={onErrorMessage && error?.message ? onErrorMessage(error.message) : error?.message}
              label={fieldControllerLabel}
            />
          )}
          value={selectedValue as AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>}
          {...autocompleteProps}
        />
      )}
    />
  );
};
