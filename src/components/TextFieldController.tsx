import { TextField, type TextFieldProps } from '@mui/material';
import { useController } from 'react-hook-form';
import { useFieldControllerLabels, useOnErrorMessage } from '../hooks/index';
import type { FieldControllerProps } from '../types/index';
import type { FieldValues } from 'react-hook-form';

export type TextFieldControllerProps<FV extends FieldValues> = FieldControllerProps<FV> & { maxLength?: number } & Omit<
    TextFieldProps,
    'error' | 'helperText' | 'label' | 'name' | 'disabled' | 'onChange' | 'value' | 'onBlur'
  >;

export const TextFieldController = <FV extends FieldValues>({
  control,
  label,
  name,
  optional = false,
  requiredLabel,
  onErrorMessage,
  disabled = false,
  maxLength,
  ...textFieldProps
}: TextFieldControllerProps<FV>) => {
  const { fieldControllerLabel } = useFieldControllerLabels({ label, optional, requiredLabel });
  const { fieldOnErrorMessage } = useOnErrorMessage({ onErrorMessage });

  const {
    field: { onChange, ...restField },
    fieldState: { invalid, error },
  } = useController({
    control,
    disabled,
    name,
  });

  return (
    <TextField
      {...textFieldProps}
      {...restField}
      aria-required={optional ? 'false' : 'true'}
      error={invalid}
      helperText={error?.message ? fieldOnErrorMessage(error?.message) : null}
      label={fieldControllerLabel}
      onChange={(e) => {
        if (maxLength === undefined) {
          onChange(e);
        } else if (e.target.value.length <= maxLength) {
          onChange(e);
        }
      }}
    />
  );
};
