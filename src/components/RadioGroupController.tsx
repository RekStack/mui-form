import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useController } from 'react-hook-form';
import { useFieldControllerLabels, useOnErrorMessage } from '../hooks/index';
import type { FieldControllerProps } from '../types/index';
import type { FieldValues } from 'react-hook-form';
import type {
  FormControlLabelProps,
  FormControlProps,
  FormHelperTextProps,
  FormLabelProps,
  RadioGroupProps,
  RadioProps,
} from '@mui/material';

interface MuiProps {
  formControlProps?: FormControlProps;
  formLabelProps?: FormLabelProps;
  formHelperTextProps?: FormHelperTextProps;
}

interface OptionMuiProps {
  radioProps?: Omit<RadioProps, 'checked'>;
  formControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label' | 'value'>;
}

interface Option {
  // TODO: add option to pass this as string or function (label accessor)
  label: string;
  // TODO: add option to pass this as an object (value accessor and)
  value: number | string;
  muiProps?: OptionMuiProps;
}

export interface RadioGroupControllerProps<FV extends FieldValues>
  extends FieldControllerProps<FV>,
    Omit<RadioGroupProps, 'name' | 'onChange' | 'value'> {
  muiProps?: MuiProps;
  options: Array<Option>;
}

export const RadioGroupController = <FV extends FieldValues>({
  control,
  controllerDisabled,
  label,
  name,
  optional = false,
  requiredLabel,
  onErrorMessage,
  muiProps,
  options,
  ...radioGroupProps
}: RadioGroupControllerProps<FV>) => {
  const { fieldControllerLabel } = useFieldControllerLabels({ label, optional, requiredLabel });
  const { fieldOnErrorMessage } = useOnErrorMessage({ onErrorMessage });

  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    control,
    disabled: controllerDisabled,
    name,
  });

  return (
    <FormControl
      {...muiProps?.formControlProps}
      error={invalid}
      fullWidth
    >
      <FormLabel {...muiProps?.formLabelProps}>{fieldControllerLabel}</FormLabel>
      <RadioGroup
        aria-required={optional ? 'false' : 'true'}
        {...field}
        {...radioGroupProps}
      >
        {options.map(({ label, value, muiProps }) => (
          <FormControlLabel
            control={<Radio {...muiProps?.radioProps} />}
            key={value}
            label={label}
            value={value}
            {...muiProps?.formControlLabelProps}
          />
        ))}
      </RadioGroup>

      {invalid && (
        <FormHelperText {...muiProps?.formHelperTextProps}>
          {error?.message ? fieldOnErrorMessage(error?.message) : null}
        </FormHelperText>
      )}
    </FormControl>
  );
};
