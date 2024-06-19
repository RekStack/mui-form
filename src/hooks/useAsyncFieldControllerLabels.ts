import { useMemo } from 'react';
import { useMuiFormConfig } from '../providers';
import type { AsyncFieldControllerProps } from '../types';

interface Props extends Omit<AsyncFieldControllerProps, 'isLoading'> {}

export const useAsyncFieldControllerLabels = ({ loadingErrorLabel, loadingLabel }: Props) => {
  const { globalLoadingErrorLabel, globalLoadingLabel } = useMuiFormConfig();

  const fieldControllerLoadingLabel = useMemo(
    () => loadingLabel || globalLoadingLabel,
    [loadingLabel, globalLoadingLabel],
  );
  const fieldControllerLoadingErrorLabel = useMemo(
    () => loadingErrorLabel || globalLoadingErrorLabel,
    [loadingErrorLabel, globalLoadingErrorLabel],
  );

  return { fieldControllerLoadingErrorLabel, fieldControllerLoadingLabel } as const;
};
