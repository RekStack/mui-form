import { createContext, useContext, useState } from 'react';
import type { PropsWithChildren } from 'react';

/**
 * Types
 */
export interface MuiFormConfig {
  globalRequiredLabel: string;
  globalLoadingErrorLabel: string;
  globalNoOptionsLabel: string;
  globalLoadingLabel: string;
  globalOnErrorMessage?: (error: string) => string;
}

interface MuiFormProps extends PropsWithChildren {
  config: Partial<MuiFormConfig>;
}

/**
 * Initializations
 */
export const defaultValues: MuiFormConfig = {
  globalLoadingErrorLabel: 'Error getting the data.',
  globalLoadingLabel: 'Loading...',
  globalNoOptionsLabel: 'No options.',
  globalRequiredLabel: '*',
};

/**
 * Helpers
 */
// add create config function

/**
 * Context
 */
const MuiFormContext = createContext<MuiFormConfig>(defaultValues);

export const useMuiFormConfig = () => {
  const context = useContext(MuiFormContext);

  if (context === undefined) {
    return defaultValues;
  }

  return context;
};

/**
 * Provider
 */
export const MuiFormProvider = ({ children, config }: MuiFormProps) => {
  const [configValue] = useState<MuiFormConfig>({
    ...defaultValues,
    ...config,
  });

  return <MuiFormContext.Provider value={configValue}>{children}</MuiFormContext.Provider>;
};
