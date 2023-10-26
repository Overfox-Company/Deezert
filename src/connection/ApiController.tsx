import axios from "axios";
import { type userType } from "../types/global";
import { AddProject } from "../api/controllers";
import { DeezerWorkspaces, DeezertManagement, DeezertSessions } from "../api/config/Microservices";

// Define the base URL for the API
const Domain = process.env.NEXT_PUBLIC_PRODUCTION == 'true' ? "https://deezert.vercel.app/" : "http://localhost:3000/";

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
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      const { status, data } = error.response;
      // Manejar el error de acuerdo a la respuesta
      console.log(status)
      console.log(data)
      // Verificar el tamaño de la respuesta
      const contentLength = error.response.headers['content-length'];
      const maxSize = 1; // Establece el límite en bytes (1MB en este ejemplo)
      if (contentLength && parseInt(contentLength) > maxSize) {
        console.log("el tamaño de la peticion es muy grande")
      }
    }

    return Promise.reject(error);
  }
);
// Create an object to hold API methods
const ApiController = {
  // Define a method to GET the server using axios
  getSessions: () => api.get(DeezertSessions + '/health'),
  getManagement: () => api.get(DeezertManagement + '/health'),
  getWorkspace: () => api.get(DeezerWorkspaces + '/health'),
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
  deleteProject: ({ id, workspaceID }: { id: any, workspaceID: any }) => api.post(Route + '/deleteProject', { id, workspaceID }),
  editProject: ({ id, value, workspaceID }: { id: any, value: string, workspaceID: any }) => api.post(Route + '/editProject', { id, value, workspaceID }),
  addListProject: (values: any) => api.post(Route + '/addListProject', values),
  getListProject: (id: any) => api.post(Route + '/getListProjects', id),
  editListProject: (value: any) => api.post(Route + '/editListProject', value),
  deleteListProject: (value: any) => api.post(Route + '/deleteListProject', value),
  addTask: (value: any) => api.post(Route + '/addTask', value),
  getAllTask: (id: any) => api.post(Route + '/getAllTask', id),
  dragTask: (values: any) => api.post(Route + '/dragTask', values),
  deleteTask: (values: any) => api.post(Route + '/deleteTask', values),
  editNameTask: (values: any) => api.post(Route + '/editNameTask', values),
  addFilesTask: (values: any) => api.post(DeezerWorkspaces + '/addFilesTask', values),
  deleteFilesTask: (values: any) => api.post(Route + '/deleteFilesTask', values),
  editTask: (values: any) => api.post(Route + '/editTask', values),
  playTask: (values: any) => api.post(Route + '/playTask', values),
  stopTask: (values: any) => api.post(Route + '/stopTask', values),
};

// Export the ApiController object as the default export
export default ApiController;
