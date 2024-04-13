import { useMemo } from 'react';
import { useMuiFormConfig } from '../index';
import type { AsyncFieldProps } from '../index';

interface Props extends Omit<AsyncFieldProps, 'isLoading'> {}

export const useAsyncFieldLabels = ({ loadingErrorLabel, loadingLabel }: Props) => {
  const { globalLoadingErrorLabel, globalLoadingLabel } = useMuiFormConfig();

  const fieldLoadingLabel = useMemo(() => loadingLabel || globalLoadingLabel, [loadingLabel, globalLoadingLabel]);
  const fieldLoadingErrorLabel = useMemo(
    () => loadingErrorLabel || globalLoadingErrorLabel,
    [loadingErrorLabel, globalLoadingErrorLabel],
  );

  return { fieldLoadingErrorLabel, fieldLoadingLabel };
};
