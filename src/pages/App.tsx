import React from "react";
import { type ProviderProps } from "../types/app";
import { AppProvider } from "../context/AppContext";
import { ProyectsProvider } from "../context/ProyectsContext";
import { WorkspaceProvider } from "../context/WorkspaceContext";
import { MicroServiceProvider } from "../context/Microservices";
const App: React.FC<ProviderProps> = ({ children }) => {

  return (
    <MicroServiceProvider>
      <ProyectsProvider>
        <WorkspaceProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </WorkspaceProvider>
      </ProyectsProvider>
    </MicroServiceProvider>

  );
};
export default App;
