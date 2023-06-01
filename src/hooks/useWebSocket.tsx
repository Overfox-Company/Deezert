import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

type SocketHookProps = {
  channel: string;
  setSocketData: any;
  server: string;
};
const prod = 'https://deezertworkspace.onrender.com';
const dev = 'http://localhost:9000'
const useSocket = ({ channel, setSocketData, server }: SocketHookProps) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Crea la conexión de socket.io-client
    const socket = io(prod);
    socketRef.current = socket;

    // Maneja los eventos de conexión y mensajes
    socket.on('connect', () => {
      console.log('Conexión de socket.io establecida');
    });

    socket.on(channel, (data: any) => {
      console.log("se ejecuto el socket");
      setSocketData(data);
    });

    // Al desmontar el componente, cierra la conexión de socket.io
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [channel, setSocketData, server]);

  // Puedes utilizar el socketRef.current para enviar mensajes a través del socket si lo necesitas

  return socketRef.current;
};

export default useSocket;
