import React, { createContext, useContext, useState } from 'react';
import { ProviderProps } from '../types/app';
import { ContextData } from '../types/app';
import { ProyectsContext } from './ProyectsContext';
import { WorkspaceContext } from './WorkspaceContext';
import { useRouter } from 'next/router';
const InitialUser = {
  _id: '',
  name: '',
  user: '',
  lastName: '',
  password: '',
  avatar: '',
  email: '',
  id: '',
  manager: false,
  session: '',
  phone: '',
  country: '',
  client: false,
  BackgroundImage: '',
  rank: '',
  speciality: '',
  Subscription: {},
  income: '',
  joinDate: '',
  verified: false,
  methodRegister: '',
  firstTime: true,
}
const SnackbarInitial = {
  message: '',
  type: "error" as "error" | "warning" | "info" | "success"
}
export const AppContext = createContext<ContextData>({
  user: InitialUser,
  setUser: () => { },
  darkMode: false,
  setDarkMode: () => { },
  token: '',
  setToken: () => { },
  isAuthenticated: false,
  loader: false,
  setLoader: () => { },
  login: () => { },
  logout: () => { },
  panel: 0,
  setPanel: () => { },
  companys: [],
  setCompanys: () => { },
  staff: [],
  setStaff: () => { },
  selectedCompany: {},
  setSelectedCompany: () => { },
  isSnackbarOpen: SnackbarInitial,
  setSnackbarOpen: () => { },
  invitations: [],
  setInvitations: () => { },
  ResetAppContext: () => { },
  googleLoaded: false,
  setGoogleLoader: () => { },
});

export const AppProvider: React.FC<ProviderProps> = ({ children }) => {
  const [googleLoaded, setGoogleLoader] = useState(false)
  const [darkMode, setDarkMode] = useState(true);
  const [token, setToken] = useState('')
  const [loader, setLoader] = useState(false)
  const [invitations, setInvitations] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(InitialUser);
  const [panel, setPanel] = useState(0)
  const [companys, setCompanys] = useState([])
  const [staff, setStaff] = useState([])
  const [selectedCompany, setSelectedCompany] = useState({})
  const [isSnackbarOpen, setSnackbarOpen] = useState({
    message: '',
    type: "error" as "error" | "warning" | "info" | "success"
  })
  const { setWorkspaces } = useContext(ProyectsContext)
  const { RestWorkspaces } = useContext(WorkspaceContext)
  const router = useRouter()
  const login = () => {
    setIsAuthenticated(true);
  };
  const ResetAppContext = () => {
    setCompanys([])
    setSelectedCompany({})
  }
  const logout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false);
    setCompanys([])
    setSelectedCompany({})
    setToken('')
    setInvitations([])
    setUser(InitialUser);
    setCompanys([])
    setStaff([])
    setWorkspaces([])
    RestWorkspaces()
    router.push('/')
  };

  return (
    <AppContext.Provider
      value={{
        googleLoaded,
        setGoogleLoader,
        invitations,
        setInvitations,
        isSnackbarOpen,
        setSnackbarOpen,
        selectedCompany,
        setSelectedCompany,
        staff,
        setStaff,
        companys,
        setCompanys,
        panel,
        setPanel,
        user,
        setUser,
        darkMode,
        setDarkMode,
        token,
        setToken,
        isAuthenticated,
        login,
        logout,
        loader,
        setLoader,
        ResetAppContext
      }}
    >
      {children}
    </AppContext.Provider>
  );
};