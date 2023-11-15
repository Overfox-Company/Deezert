import React from "react";
import {
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
} from "react";
export type ProyectsType = {
  workspaces: any[];
  setWorkspaces: React.Dispatch<React.SetStateAction<any>>;
};
export type WorksPaceType = {
  workspaces: any;
  setWorkspaces: React.Dispatch<React.SetStateAction<any>>;
  listWorkspace: any;
  setListWorkspace: React.Dispatch<React.SetStateAction<any>>;
  workspaceActive: any;
  setWorkspaceActive: React.Dispatch<React.SetStateAction<any>>;
  viewActive: any;
  setViewActive: React.Dispatch<React.SetStateAction<any>>;
  lisprojects: any;
  setLisprojects: React.Dispatch<React.SetStateAction<any>>;
  taskList: any;
  setTaskList: React.Dispatch<React.SetStateAction<any>>;
  selectedTask: any;
  setSelectedTask: React.Dispatch<React.SetStateAction<any>>;
  RestWorkspaces: any;
  staffAssigned: any[],
  setStaffAssigned: React.Dispatch<React.SetStateAction<any>>,
  staffUnassigned: any[],
  setStaffUnasigned: React.Dispatch<React.SetStateAction<any>>,
  clientsAssigned: any[],
  setClientsAssigned: React.Dispatch<React.SetStateAction<any>>,
  clientsUnassigned: any[],
  setClientsUnasigned: React.Dispatch<React.SetStateAction<any>>,
  proyectSelected: any
  setProyectSelected: React.Dispatch<React.SetStateAction<any>>
  idProject: string,
  setIdProject: React.Dispatch<React.SetStateAction<string>>,
};
export type TaskType = {
  _id: string;
  title: string;
  description: string;
  files: any;
  CreatedDate: string;
  dateEnd: string;
  workspaceID: string;
  assigned: any;
  timeWorked: string;
  priority: string;
  list: any;
};
