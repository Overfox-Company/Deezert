import React, { createContext, useState, useEffect } from "react";
import { ProviderProps } from "../types/app";
import { WorksPaceType } from "../types/Proyects";
export const WorkspaceContext = createContext<WorksPaceType>({
  workspaces: [],
  setWorkspaces: () => { },
  listWorkspace: [],
  setListWorkspace: () => { },
  workspaceActive: [],
  setWorkspaceActive: () => { },
  viewActive: [],
  setViewActive: () => { },
  lisprojects: [],
  setLisprojects: () => { },
  taskList: [],
  setTaskList: () => { },
  selectedTask: [],
  setSelectedTask: () => { },
  RestWorkspaces: () => { },
  staffAssigned: [],
  setStaffAssigned: () => { },
  staffUnassigned: [],
  setStaffUnasigned: () => { },
  clientsAssigned: [],
  setClientsAssigned: () => { },
  clientsUnassigned: [],
  setClientsUnasigned: () => { },
  proyectSelected: {},
  setProyectSelected: () => { },
  idProject: "",
  setIdProject: () => { },
});


export const WorkspaceProvider: React.FC<ProviderProps> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceActive, setWorkspaceActive] = useState([]);
  const [listWorkspace, setListWorkspace] = useState([])
  const [viewActive, setViewActive] = useState('')
  const [lisprojects, setLisprojects] = useState([])
  const [taskList, setTaskList] = useState([])
  const [selectedTask, setSelectedTask] = useState([])
  const [staffAssigned, setStaffAssigned] = useState([])
  const [staffUnassigned, setStaffUnasigned] = useState([])
  const [clientsAssigned, setClientsAssigned] = useState([])
  const [clientsUnassigned, setClientsUnasigned] = useState([])
  const [proyectSelected, setProyectSelected] = useState({})
  const [idProject, setIdProject] = useState("")
  const RestWorkspaces = () => {
    setSelectedTask([])
    setTaskList([])
    setViewActive('')
    setListWorkspace([])
    setWorkspaces([])
    setWorkspaceActive([])
  }
  useEffect(() => {
    console.log(idProject)
  }, [idProject])
  return (
    <WorkspaceContext.Provider
      value={{
        idProject,
        setIdProject,
        proyectSelected,
        setProyectSelected,
        clientsAssigned,
        setClientsAssigned,
        clientsUnassigned,
        setClientsUnasigned,
        staffAssigned,
        setStaffAssigned,
        staffUnassigned,
        setStaffUnasigned,
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
