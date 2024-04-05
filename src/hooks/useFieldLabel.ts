import { useMemo } from 'react';
import { useMuiFormConfig } from '../index';
import type { FieldProps } from '../index';
import type { FieldValues } from 'react-hook-form';

interface Props extends Pick<FieldProps<FieldValues>, 'requiredLabel'> {
  label: string;
  isOptional: boolean;
}

export const useFieldLabel = ({ label, isOptional, requiredLabel }: Props) => {
  const { globalRequiredLabel } = useMuiFormConfig();

  const fieldLabel = useMemo(() => {
    if (isOptional) {
      return label;
    }

    return `${label} ${requiredLabel || globalRequiredLabel}`;
  }, [isOptional, label, requiredLabel, globalRequiredLabel]);

  return { fieldLabel };
};
