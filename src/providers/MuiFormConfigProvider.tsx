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
}

interface MuiFormConfigProps extends PropsWithChildren {
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
const MuiFormConfigContext = createContext<MuiFormConfig>(defaultValues);

export const useMuiFormConfig = () => {
  const context = useContext(MuiFormConfigContext);

  if (context === undefined) {
    return defaultValues;
  }

  return context;
};

/**
 * Provider
 */
export const MuiFormConfigProvider = ({ children, config }: MuiFormConfigProps) => {
  const [configValue] = useState<MuiFormConfig>({
    ...defaultValues,
    ...config,
  });

  return <MuiFormConfigContext.Provider value={configValue}>{children}</MuiFormConfigContext.Provider>;
};
