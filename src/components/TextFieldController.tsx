import { Controller } from 'react-hook-form';
import { TextField as MuiTextField } from '@mui/material';
import { useFieldControllerLabels } from '../index';
import type { FieldControllerProps } from '../index';
import type { FieldValues } from 'react-hook-form';
import type { TextFieldProps } from '@mui/material';

export type TextFieldControllerProps<FV extends FieldValues> = FieldControllerProps<FV> &
  Omit<TextFieldProps, 'error' | 'helperText' | 'label' | 'name'>;

export const TextFieldController = <FV extends FieldValues>({
  control,
  label,
  name,
  optional = false,
  requiredLabel,
  onErrorMessage,
  ...textFieldProps
}: TextFieldControllerProps<FV>) => {
  const { fieldControllerLabel } = useFieldControllerLabels({ label, optional, requiredLabel });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { invalid, error } }) => (
        <MuiTextField
          {...field}
          aria-required={optional ? 'false' : 'true'}
          error={invalid}
          helperText={onErrorMessage && error?.message ? onErrorMessage(error.message) : error?.message}
          label={fieldControllerLabel}
          {...textFieldProps}
        />
      )}
    />
  );
};
