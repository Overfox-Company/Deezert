import React from 'react';
export type ContextData = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ProviderProps = {
  children?: React.ReactNode;
};