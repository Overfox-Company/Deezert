import React from "react";
import { type ProviderProps } from "../types/app";
import { AppProvider } from "../context/AppContext";
import { ProyectsProvider } from "../context/ProyectsContext";
import { WorkspaceProvider } from "../context/WorkspaceContext";
const App: React.FC<ProviderProps> = ({ children }) => {

  return (
    <AppProvider>
      <ProyectsProvider>
        <WorkspaceProvider>{children}</WorkspaceProvider>
      </ProyectsProvider>
    </AppProvider>
  );
};
export default App;
