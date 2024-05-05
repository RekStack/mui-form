import { useMemo } from 'react';
import { useMuiFormConfig } from '../index';
import type { FieldControllerProps } from '../index';
import type { FieldValues } from 'react-hook-form';

interface Props extends Pick<FieldControllerProps<FieldValues>, 'requiredLabel'> {
  label: string;
  optional: boolean;
}

export const useFieldControllerLabels = ({ label, optional, requiredLabel }: Props) => {
  const { globalRequiredLabel } = useMuiFormConfig();

  const fieldControllerLabel = useMemo(() => {
    if (optional) {
      return label;
    }

    return `${label} ${requiredLabel || globalRequiredLabel}`;
  }, [optional, label, requiredLabel, globalRequiredLabel]);

  return { fieldControllerLabel };
};