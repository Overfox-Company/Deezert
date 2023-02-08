import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const useWebSocket = (url:any, initialState:any, setState:any) => {
  // Usamos el hook useState para mantener el estado de la información que recibimos a través del WebSocket
  const [data, setData] = useState(initialState);

  useEffect(() => {
    // Conectamos al servidor de WebSockets mediante la librería socket.io-client
    const socket = io(url);

    // Escuchamos el evento 'update' que es enviado desde el servidor
    socket.on('update', (newData:any) => {
      // Actualizamos el estado con la nueva información recibida
      setState(newData);
    });

    // Devolvemos una función cleanup para desconectar el WebSocket cuando el componente se desmonte
    return () => {
      socket.disconnect();
    };
  }, [url, setState]);

  // Devolvemos el estado actual y la función para actualizar el estado
  return [data, setData];
};

export default useWebSocket;