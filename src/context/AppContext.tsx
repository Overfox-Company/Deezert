import React, { createContext, useState } from 'react';
import { ProviderProps } from '../types/app';
import { ContextData } from '../types/app';
const InitialUser = {
                _id:'',
                name: '',
                user: '',
                lastName:  '',
                password:  '',
                avatar:  '',
                email:  '',
                id:  '',
                manager: false,
                session: '',
                phone: '',
                country: '',
                client: false,
                BackgroundImage: '',
                rank: '',
                speciality: '',
                Subscription: {},
                income:'',
                joinDate:  '',
                verified: false,
                methodRegister: '',
                firstTime: true,
}
export const AppContext = createContext<ContextData>({
    user:InitialUser,
    setUser: () => { },
    darkMode: false,
    setDarkMode: () => { },
    token:'',
    setToken: ()=>{ },
    isAuthenticated: false,
    loader:false,
    setLoader:()=>{},
    login: () => {},
    logout: () => { },
    panel:0,
    setPanel: () => { },
    companys: [],
    setCompanys: ()=>{}
});

export const AppProvider: React.FC<ProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);
    const [token, setToken] = useState('')
    const [loader,setLoader]=useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(InitialUser);
    const [panel, setPanel] = useState(0)
    const [companys,setCompanys]=useState([])
    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
      <AppContext.Provider
        value={{
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
        }}
      >
        {children}
      </AppContext.Provider>
    );
};