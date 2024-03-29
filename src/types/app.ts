import React from "react";
import {
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
} from "react";
export type AddCompanyTypes = {
  name: string;
};
export type UploadImagesType = {
  maxNumber: number;
  label?: string;
  images: any[];
  setImages: any;
  textButton: string;
  variant?: number;
};
export type InputProps = {
  icon?: boolean | undefined;
  name?: string | undefined;
  label?: string | undefined;
  error?: string | undefined;
  touched?: boolean | undefined;
  placeholder?: string | undefined;
  type?: string | undefined;
  as?: string | undefined;
  rows?: number | undefined;
  cols?: number | undefined;
  children?: React.ReactNode;
};
export type Props = {
  children?: ReactNode;
  onClick?: MouseEventHandler | undefined;
  style?: CSSProperties | undefined;
};
export type AddFile = {
  onClick?: MouseEventHandler;
};
export type ContextData = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  isAuthenticated: boolean;
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  login: () => void;
  logout: () => void;
  panel: number;
  setPanel: React.Dispatch<React.SetStateAction<number>>;
  companys: any[];
  setCompanys: React.Dispatch<React.SetStateAction<any>>;
  staff: any[];
  setStaff: React.Dispatch<React.SetStateAction<any>>;
  selectedCompany: any;
  setSelectedCompany: React.Dispatch<React.SetStateAction<any>>;
  isSnackbarOpen: Snackbar;
  setSnackbarOpen: React.Dispatch<React.SetStateAction<any>>;
  invitations: any[];
  setInvitations: React.Dispatch<React.SetStateAction<any>>;
  ResetAppContext: any;
  googleLoaded: boolean;
  setGoogleLoader: React.Dispatch<React.SetStateAction<boolean>>;
  clients: any[],
  setClients: React.Dispatch<React.SetStateAction<any>>,
  proyectWorkspaces: any,
  setProyectWorkspaces: React.Dispatch<React.SetStateAction<any>>
};
type Snackbar = {
  message: string;
  type: "error" | "warning" | "info" | "success" | undefined;
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
  _id: string;
};
export type ProviderProps = {
  children?: React.ReactNode;
  className?: string;
};

export interface ContainerProps {
  direction?: string | any;
  children: ReactNode;
  justifyContent?: string | any;
  style?: any;
  columnSpacing?: number | any;
  alignItems?: string;
  rowSpacing?: number | any;
  sx?: any;
  ref?: any;
}
export interface ItemProps {
  onClick?: any;
  style?: any,
  children: ReactNode;
  xs?: number;
  md?: number;
  sx?: any;
  lg?: number;
  xl?: number;
}