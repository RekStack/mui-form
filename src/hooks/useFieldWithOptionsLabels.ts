import { useMemo } from 'react';
import { useMuiFormConfig } from '../index';
import type { FieldWithOptionsProps, ObjectLike } from '../index';

interface Props extends Pick<FieldWithOptionsProps<ObjectLike>, 'noOptionsLabel'> {}

export const useFieldWithOptionsLabels = ({ noOptionsLabel }: Props) => {
  const { globalNoOptionsLabel } = useMuiFormConfig();

  const fieldNoOptionsLabel = useMemo(
    () => noOptionsLabel || globalNoOptionsLabel,
    [globalNoOptionsLabel, noOptionsLabel],
  );

  return { fieldNoOptionsLabel };
};
