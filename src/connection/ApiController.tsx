import axios from "axios";
import {type userType } from "../types/global";
import { AddProject } from "../api/controllers";
// Define the base URL for the API
const Domain = process.env.NEXT_PUBLIC_PRODUCTION == 'true'?"https://deezert.vercel.app/":"http://localhost:3000/";

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
  signIn: (user: userType) => api.post(Route + '/signIn', user),
  AddCompany: (data: any) => api.post(Route + '/addCompany', data),
  FirstSession: (id: any) => api.post(Route + '/firstSession', id),
  getCompanys: (id: any) => api.post(Route + '/getCompanys', id),
  SendInvitations: (data: any[]) => api.post(Route + '/sendMails', data),
  GetInvitations: (id: any) => api.post(Route + '/getInvitations', id),
  AddWorkspaces: (data: any) => api.post(Route + '/addWorkspace', data),
  GetWorkspace: (id: any) => api.post(Route + '/getWorkspace', { id: id }),
  AceptRoute: (id: any) => api.post(Route + '/aceptRoute', { id: id }),
  getCompanyOwner: (id: any) => api.post(Route + '/getCompanyOwner', id),
  getWorkspaceList: (id: any) => api.post(Route + '/getWorkspaceList', id),
  AddProject: ({ name, workspaceID }: { name: any, workspaceID: any }) => api.post(Route + '/addProject', { name, workspaceID }),
  deleteProject:({ id, workspaceID }: { id: any, workspaceID: any })=>api.post(Route + '/deleteProject',{id,workspaceID}),
  editProject: ({ id, value, workspaceID }: { id: any, value: string, workspaceID: any }) => api.post(Route + '/editProject', { id, value, workspaceID }),
  addListProject: (values: any) => api.post(Route + '/addListProject', values),
  getListProject: (id: any) => api.post(Route + '/getListProjects', id),
  editListProject: (value: any) => api.post(Route + '/editListProject', value),
  deleteListProject: (value: any) => api.post(Route + '/deleteListProject', value),
};

// Export the ApiController object as the default export
export default ApiController;
