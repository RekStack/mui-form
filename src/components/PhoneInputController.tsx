import { FieldValues, useController } from 'react-hook-form';
import { useFieldControllerLabels, useOnErrorMessage } from '../hooks';
import { DistributiveOmit, FieldControllerProps } from '../types';
import { MuiTelInput, type MuiTelInputProps } from 'mui-tel-input';

export type PhoneInputControllerProps<FV extends FieldValues> = FieldControllerProps<FV> &
  DistributiveOmit<
    MuiTelInputProps,
    'onChange' | 'error' | 'helperText' | 'label' | 'name' | 'disabled' | 'value' | 'onBlur'
  >;

export const PhoneInputController = <FV extends FieldValues>({
  control,
  label,
  name,
  optional = false,
  requiredLabel,
  onErrorMessage,
  disabled = false,
  ...muiTelInputProps
}: PhoneInputControllerProps<FV>) => {
  const { fieldControllerLabel } = useFieldControllerLabels({ label, optional, requiredLabel });
  const { fieldOnErrorMessage } = useOnErrorMessage({ onErrorMessage });

  const {
    field: { onChange, ref, ...restField },
    fieldState: { invalid, error },
  } = useController({
    control,
    disabled,
    name,
  });

  return (
    <MuiTelInput
      {...restField}
      defaultCountry='PT'
      aria-required={optional ? 'false' : 'true'}
      error={invalid}
      helperText={error?.message ? fieldOnErrorMessage(error?.message) : null}
      inputRef={ref}
      ref={ref}
      label={fieldControllerLabel}
      onChange={(_, info) => {
        onChange(info.numberValue);
      }}
      sx={{
        ...muiTelInputProps?.sx,
        '.MuiTelInput-FlagImg': {
          borderRadius: (theme) => theme.shape.borderRadius / 4,
        },
      }}
      {...muiTelInputProps}
    />
  );
};
