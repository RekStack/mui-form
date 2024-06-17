import { useMemo } from 'react';
import { useMuiFormConfig } from '../index';
import type { AsyncFieldControllerProps } from '../index';

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
