import React, { FC, createContext, useEffect, useState } from 'react';
import ApiController from '../connection/ApiController';


export const MicroServiceContext = createContext<any>({


});

export const MicroServiceProvider: FC<any> = ({ children }) => {
    const [lapse, setLapse] = useState(4000);
    const [microServices, setMicroservices] = useState(false);
    const checkMicroservices = async () => {
        try {
            const [sessionResponse, managementResponse, workspaceResponse] = await Promise.all([
                ApiController.getSessions(),
                ApiController.getManagement(),
                ApiController.getWorkspace()
            ]);

            const updatedServicesActive = {
                session: sessionResponse.status === 200 || sessionResponse.status === 304,
                management: managementResponse.status === 200 || managementResponse.status === 304,
                workspace: workspaceResponse.status === 200 || workspaceResponse.status === 304
            };
            if (updatedServicesActive.management && updatedServicesActive.session && updatedServicesActive.workspace) {

                setMicroservices(true);
                setLapse(40000); // Actualiza el intervalo a 10 segundos
            } else {
                setMicroservices(false);
                setLapse(4000); // Vuelve al intervalo original si no todos los servicios están activos
            }
        } catch (error) {
            console.error("Error occurred while fetching microservices:", error);
        }
    };

    useEffect(() => {
        checkMicroservices()
        const interval = setInterval(() => {
            checkMicroservices();

        }, lapse);

        return () => {
            clearInterval(interval);
        };
    }, [lapse]);

    return (
        <MicroServiceContext.Provider
            value={{
                microServices
            }}
        >
            {children}
        </MicroServiceContext.Provider>
    );
};
