import { useCallback } from 'react';
import { useMuiFormConfig } from '../providers/index';

interface Props {
  onErrorMessage?: (error: string) => string;
}

export const useOnErrorMessage = ({ onErrorMessage }: Props) => {
  const { globalOnErrorMessage } = useMuiFormConfig();

  const fieldOnErrorMessage = useCallback(
    (error: string) => {
      if (onErrorMessage) {
        return onErrorMessage(error);
      } else if (globalOnErrorMessage) {
        return globalOnErrorMessage(error);
      }

      return error;
    },
    [onErrorMessage, globalOnErrorMessage],
  );

  return { fieldOnErrorMessage } as const;
};
