import { callApi } from './apiClient';
const API = ''; // Mock API constant
import { createContext, useContext } from 'react';

export const LanguageContext = createContext(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
