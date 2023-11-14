import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProviderProps } from '../types/app';
import { ContextData } from '../types/app';
import { WorkspaceContext } from './WorkspaceContext';
import { useRouter } from 'next/router';
import ApiController from '../connection/ApiController';
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
  clients: [],
  setClients: () => { },
  proyectWorkspaces: [],
  setProyectWorkspaces: () => { }
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
  const [proyectWorkspaces, setProyectWorkspaces] = useState<any>([])
  const [clients, setClients] = useState([])
  const [selectedCompany, setSelectedCompany] = useState<any>({})
  const [isSnackbarOpen, setSnackbarOpen] = useState({
    message: '',
    type: "error" as "error" | "warning" | "info" | "success"
  })
  const {
    RestWorkspaces,
    workspaces,
    setTaskList,
    setStaffAssigned,
    setStaffUnasigned,
    setClientsAssigned,
    setClientsUnasigned,
    setProyectSelected,
    proyectSelected
  } = useContext(WorkspaceContext)
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
    setProyectWorkspaces([])
    RestWorkspaces()
    router.push('/')
  };
  const { workspace: id } = router.query;
  const searchBy = selectedCompany._id || workspaces._id
  useEffect(() => {
    if (searchBy) {
      setLoader(true);
      ApiController.GetInvitations({ id: searchBy }).then((e) => {

        setInvitations(e.data.invitation);
        setClients(e.data?.clients)
        setStaff(e.data?.staff);
      });
      setLoader(false);
    }
  }, [selectedCompany, user, id]);
  useEffect(() => {
    if (workspaces._id) {
      Promise.all([
        ApiController.getAllTask({ id: id }),
      ]).then(([taskResponse]) => {
        setTaskList(taskResponse.data);
        setLoader(false);
      });
    }
  }, [workspaces, user, id]);
  useEffect(() => {
    if (searchBy) {
      ApiController.GetWorkspace({ id: searchBy }).then((e) => {
        setProyectWorkspaces(e.data);
        console.log(e.data)
      });
    }
  }, [searchBy]);
  useEffect(() => {
    setProyectSelected(proyectWorkspaces.filter((proyect: any) => proyect._id === id)[0])
  }, [id, proyectWorkspaces, searchBy])
  useEffect(() => {
    console.log("staff")
    console.log(staff)
    console.log("proyectSelected")
    console.log(proyectSelected)
    console.log("clients")
    console.log(clients)
    if (proyectSelected._id && staff && clients) {
      console.log("se ejecuta el if")
      const filterStaffA = staff.filter((e: any) => proyectSelected.members?.includes(e._id))
      const filterStaffU = staff.filter((e: any) => !proyectSelected.members?.includes(e._id))
      setStaffAssigned(filterStaffA)
      setStaffUnasigned(filterStaffU)

      const filterClientsA = clients.filter((e: any) => proyectSelected.clients?.includes(e._id))
      const filterClientsU = clients.filter((e: any) => !proyectSelected.clients?.includes(e._id))
      setClientsAssigned(filterClientsA)
      setClientsUnasigned(filterClientsU)

    }


  }, [proyectWorkspaces, proyectSelected, staff, clients, searchBy])
  return (
    <AppContext.Provider
      value={{
        proyectWorkspaces,
        setProyectWorkspaces,
        clients,
        setClients,
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