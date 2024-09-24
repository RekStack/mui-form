import { useMemo } from 'react';

import { useMuiFormConfig } from '../providers/index';

import type { FieldControllerWithOptionsProps, ObjectLike } from '../types/index';

type Props = Pick<FieldControllerWithOptionsProps<ObjectLike>, 'noOptionsLabel'>;

export const useFieldControllerWithOptionsLabels = ({ noOptionsLabel }: Props) => {
  const { globalNoOptionsLabel } = useMuiFormConfig();

  const fieldControllerNoOptionsLabel = useMemo(
    () => noOptionsLabel || globalNoOptionsLabel,
    [globalNoOptionsLabel, noOptionsLabel],
  );

  return { fieldControllerNoOptionsLabel } as const;
};
