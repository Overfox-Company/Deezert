import React from "react";
export type ContextData = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};
type UserType = {
  name: string;
  user: string;
  lastName: string;
  password: string;
  avatar: string;
  email: string;
  id: string;
  manager: boolean;
  session: string;
  phone: string;
  country: string;
  client: boolean;
  BackgroundImage: string;
  rank: string;
  speciality: string;
  Subscription: any;
  income: string;
  joinDate: string;
  verified: boolean;
  methodRegister: string;
};
export type ProviderProps = {
  children?: React.ReactNode;
  className?: string;
};
