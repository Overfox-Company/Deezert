import axios from "axios";
import {type userType } from "../types/global";
// Define the base URL for the API
const Domain = "http://localhost:3000/";

// Define the base route for the API
const Route = `${Domain}api`;

const api = axios.create({
  baseURL: Route,
});
const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
// Enviar el token en cada solicitud
api.interceptors.request.use(async (config: any) => {
  const token = await getToken(); // Obtener el token de alguna manera
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
// interceptor de respuesta
api.interceptors.response.use(
  (response) => {
    return response;
  }
);
// Create an object to hold API methods
const ApiController = {
  // Define a method to GET the server using axios
  getServer: () => api.get(Route),
  signIn:(user:userType) =>api.post(Route + '/signIn',user)
};

// Export the ApiController object as the default export
export default ApiController;
