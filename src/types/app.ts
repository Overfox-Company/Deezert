import React from "react";
export type ContextData = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

export type ProviderProps = {
  children?: React.ReactNode;
};
