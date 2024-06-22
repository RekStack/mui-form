import { DatePicker } from '@mui/x-date-pickers';
import { stringToDate } from '../utils/index';
import { useController } from 'react-hook-form';
import { useFieldControllerLabels, useOnErrorMessage } from '../hooks/index';
import type { DatePickerProps, PickerValidDate } from '@mui/x-date-pickers';
import type { FieldControllerProps } from '../types/index';
import type { FieldValues } from 'react-hook-form';

export type DatePickerControllerProps<
  FV extends FieldValues,
  PVD extends PickerValidDate,
  PickerEnableAccessibleFieldDOMStructure extends boolean = false,
> = FieldControllerProps<FV> &
  Omit<
    DatePickerProps<PVD, PickerEnableAccessibleFieldDOMStructure>,
    'label' | 'name' | 'disabled' | 'onChange' | 'value' | 'onBlur'
  >;

export const DatePickerController = <
  FV extends FieldValues,
  PVD extends PickerValidDate,
  PickerEnableAccessibleFieldDOMStructure extends boolean = false,
>({
  control,
  label,
  name,
  optional = false,
  requiredLabel,
  onErrorMessage,
  disabled = false,
  ...datePickerProps
}: DatePickerControllerProps<FV, PVD, PickerEnableAccessibleFieldDOMStructure>) => {
  const { fieldControllerLabel } = useFieldControllerLabels({ label, optional, requiredLabel });
  const { fieldOnErrorMessage } = useOnErrorMessage({ onErrorMessage });

  const {
    field: { value, ...restField },
    fieldState: { invalid, error },
  } = useController({
    control,
    disabled,
    name,
  });

  return (
    <DatePicker
      {...datePickerProps}
      {...restField}
      aria-required={optional ? 'false' : 'true'}
      label={fieldControllerLabel}
      slotProps={{
        ...datePickerProps?.slotProps,
        textField: {
          ...datePickerProps?.slotProps?.textField,
          error: invalid,
          helperText: error?.message ? fieldOnErrorMessage(error?.message) : null,
        },
      }}
      value={stringToDate(value)}
    />
  );
};
