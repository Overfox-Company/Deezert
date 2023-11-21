import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

type SocketHookProps = {
  channel: string;
  setSocketData: any;
  server: string;
  id: string | undefined | string[];
};
const prod = 'https://deezertworkspace.onrender.com';
const dev = 'http://localhost:10000'
const port = process.env.NEXT_PUBLIC_PRODUCTION_MICROSERVICES == 'true' ? prod : dev
const useSocket = ({ channel, setSocketData, server, id }: SocketHookProps) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Crea la conexión de socket.io-client
    if (id) {
      const socket = io(port);
      socketRef.current = socket;

      // Maneja los eventos de conexión y mensajes
      socket.on('connect', () => {
        console.log(`Conexión de socket.io establecida con ${channel + '/' + id}`);
      });

      socket.on(channel + '/' + id, (data: any) => {
        console.log(`se ejecuto el socket ${channel}`);
        setSocketData(data);
      });
    }


    // Al desmontar el componente, cierra la conexión de socket.io
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [channel, setSocketData, server, id]);

  // Puedes utilizar el socketRef.current para enviar mensajes a través del socket si lo necesitas

  return socketRef.current;
};

export default useSocket;
