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
  viewActive:[],
  setViewActive: () => { },
  lisprojects: [],
  setLisprojects: () => { },
  taskList:[],
  setTaskList: () => { }
});


export const WorkspaceProvider: React.FC<ProviderProps> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceActive, setWorkspaceActive] = useState([]);
  const [listWorkspace, setListWorkspace]=useState([])
  const [viewActive, setViewActive] = useState('')
  const [lisprojects, setLisprojects] = useState([])
  const [taskList,setTaskList]=useState([])
  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        setWorkspaces,
        listWorkspace,
        setListWorkspace,
        workspaceActive,
        setWorkspaceActive,
        viewActive,
        setViewActive,
        lisprojects,
        setLisprojects,
        taskList,
        setTaskList
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
