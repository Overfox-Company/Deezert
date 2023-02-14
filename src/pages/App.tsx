import React,{useEffect,useContext} from 'react';
import { type ProviderProps } from '../types/app';
import {AppProvider } from '../context/AppContext';
import { ProyectsProvider } from '../context/ProyectsContext';
const App: React.FC<ProviderProps> = ({ children }) => {

  return (
    <AppProvider>
      <ProyectsProvider>
      {children}
      </ProyectsProvider>
    </AppProvider>
  );
}
export default App;