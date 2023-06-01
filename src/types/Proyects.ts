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
};
