import React, { createContext, useState } from "react";
import { ProviderProps } from "../types/app";
import { WorksPaceType } from "../types/Proyects";
export const WorkspaceContext = createContext<WorksPaceType>({
  workspaces: [],
  setWorkspaces: () => { },
  listWorkspace:[],
  setListWorkspace: () => { },
  workspaceActive:[],
  setWorkspaceActive: () => { },
});

export const WorkspaceProvider: React.FC<ProviderProps> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceActive, setWorkspaceActive] = useState([]);
  const [listWorkspace, setListWorkspace]=useState([])

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        setWorkspaces,
        listWorkspace,
        setListWorkspace,
        workspaceActive,
        setWorkspaceActive
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
