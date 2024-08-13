import { MuiTelInput, matchIsValidTel as _matchIsValidTel } from 'mui-tel-input';
import { useController } from 'react-hook-form';
import { useFieldControllerLabels, useOnErrorMessage } from '../hooks/index';
import type { DistributiveOmit, FieldControllerProps } from '../types/index';
import type { FieldValues } from 'react-hook-form';
import type { MuiTelInputProps } from 'mui-tel-input';

// Export mui-tel-input method that could help people to make validations
// without the need to install the peer-dependency
export const matchIsValidTel = _matchIsValidTel;

export type PhoneInputControllerProps<FV extends FieldValues> = FieldControllerProps<FV> &
  DistributiveOmit<MuiTelInputProps, 'onChange' | 'error' | 'helperText' | 'label' | 'name' | 'value' | 'onBlur'>;

export const PhoneInputController = <FV extends FieldValues>({
  control,
  controllerDisabled,
  label,
  name,
  optional = false,
  requiredLabel,
  onErrorMessage,
  ...muiTelInputProps
}: PhoneInputControllerProps<FV>) => {
  const { fieldControllerLabel } = useFieldControllerLabels({ label, optional, requiredLabel });
  const { fieldOnErrorMessage } = useOnErrorMessage({ onErrorMessage });

  const {
    field: { onChange, ref, ...restField },
    fieldState: { invalid, error },
  } = useController({
    control,
    disabled: controllerDisabled,
    name,
  });

  return (
    <MuiTelInput
      {...restField}
      aria-required={optional ? 'false' : 'true'}
      defaultCountry='PT'
      error={invalid}
      helperText={error?.message ? fieldOnErrorMessage(error?.message) : null}
      inputRef={ref}
      label={fieldControllerLabel}
      onChange={(_, info) => {
        onChange(info.numberValue);
      }}
      ref={ref}
      sx={{
        '.MuiTelInput-FlagImg': {
          borderRadius: '3px',
        },
        ...muiTelInputProps?.sx,
      }}
      {...muiTelInputProps}
    />
  );
};
