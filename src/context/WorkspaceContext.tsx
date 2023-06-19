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
  setTaskList: () => { },
  selectedTask:[],
  setSelectedTask: () => { },
  RestWorkspaces:()=>{}
});


export const WorkspaceProvider: React.FC<ProviderProps> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceActive, setWorkspaceActive] = useState([]);
  const [listWorkspace, setListWorkspace]=useState([])
  const [viewActive, setViewActive] = useState('')
  const [lisprojects, setLisprojects] = useState([])
  const [taskList, setTaskList] = useState([])
  const [selectedTask, setSelectedTask] = useState([])
  const RestWorkspaces = () => {
    setSelectedTask([])
    setTaskList([])
    setViewActive('')
    setListWorkspace([])
    setWorkspaces([])
    setWorkspaceActive([])
  }
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
        setTaskList,
        selectedTask,
        setSelectedTask,
        RestWorkspaces
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
