import { callApi } from '../apiClient';
import { createContext, useContext } from 'react';

export const LanguageContext = createContext(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
