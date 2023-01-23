import React,{useEffect,useContext} from 'react';
import { type ProviderProps } from '../types/app';
import { AppContext, AppProvider } from '../context/AppContext';
import { ConnectServer } from '../functions/app/ApiFunctions';
const App: React.FC<ProviderProps> = ({ children }) => {

  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
}
export default App;