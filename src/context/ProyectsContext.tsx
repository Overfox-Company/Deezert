import React, { createContext, useState } from 'react';
import { ProviderProps } from '../types/app';
import { ProyectsType } from '../types/Proyects';
export const ProyectsContext = createContext<ProyectsType>({
    workspaces:[],
    setWorkspaces:()=>{}
    
});

export const ProyectsProvider: React.FC<ProviderProps> = ({ children }) => {
const [workspaces,setWorkspaces]=useState([])
    return (
      <ProyectsContext.Provider
        value={{
            workspaces,
            setWorkspaces
        }}
      >
        {children}
      </ProyectsContext.Provider>
    );
};