import type { ServerType } from "../../types/server";
import verify from "../../functions/server/TokenVerify";
import {
  DeezertSessions,
  DeezertManagement,
  DeezerWorkspaces,
} from "../config/Microservices";
import axios from "axios";
import Server from "next/dist/server/base-server";
// Define the FirstRoute function as a ServerType
export const FirstRoute: ServerType = async (req, res) => {
  try {
    // Send a status of 200 and a message to the client
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const token = req.headers.authorization.split(" ")[1];
    const type = "google";
    verify({ token, type }).then((payload: any) => {
      if (payload?.iss === "accounts.google.com") {
        console.log("verificacion del token");
        console.log(payload?.sub);
        const data = { googleId: payload?.sub };
        axios.post(DeezertSessions + "/login", data).then((e) => {
          console.log("respondio deezertsessions");
          res.status(200).send(e.data);
        });
      } else {
        res.status(401).send("unauthorized");
      }
    });
  } catch (error) {
    console.log("cath del backend al validar el token");
    console.log(error);
  }
};
export const SignInController: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const user = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const type = "google";
    verify({ token, type }).then((payload: any) => {
      if (payload?.iss === "accounts.google.com") {
        axios.post(DeezertSessions + "/login", user).then((e) => {
          res.status(200).send(e.data);
        });
      } else {
        res.status(401).send("unauthorized");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const AddCompanyController: ServerType = async (req, res) => {
  console.log(req.body.values);
  console.log("------------");
  console.log(req.body.id);
  console.log("------------");
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    axios
      .post(DeezertManagement + "/addCompany", req.body)
      .then((e) => console.log(e));
    res.status(200).send("oksxdd");
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const FirstSession: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const id = req.body.id;
    console.log("first session");
    console.log(req.body.id);
    axios
      .post(DeezertManagement + "/firstSession", { id: id })
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const GetCompanys: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const id = req.body.id;
    console.log(req.body.id);
    axios.post(DeezertManagement + "/getCompanys", { id: id }).then((e) => {
      res.status(200).json(e.data);
    });
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const SendMails: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const data = req.body;
    console.log("send mails");
    console.log(req.body);
    axios
      .post(DeezertManagement + "/sendMails", data)
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const GetInvitations: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const id = req.body.id;
    console.log(req.body);
    axios
      .post(DeezertManagement + "/getInvitations", { id: id })
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const AddWorkspaceController: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    console.log("xdxd");
    const data = req.body;
    axios
      .post(DeezerWorkspaces + "/createWorkspace", data)
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const GetWorkspaceController: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const id = req.body.id;
    axios
      .post(DeezerWorkspaces + "/getWorkspace", id)
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const AceptRouteController: ServerType = async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id);
    axios
      .post(DeezertManagement + `/aceptRoute/${id}`)
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const GetCompanyOwner: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const id = req.body.id;
    axios
      .post(DeezerWorkspaces + "/getCompanyOwner", { id })
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const GetWorkspaceList: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const id = req.body.id;
    console.log("aca este llegando el id " + id);
    axios
      .post(DeezerWorkspaces + "/getWorkspaceList", { id })
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const AddProject: ServerType = (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const name = req.body.name;
    const workspaceID = req.body.workspaceID;
    axios
      .post(DeezerWorkspaces + "/addProyect", {
        name: name,
        workspaceID: workspaceID,
      })
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const DeleteProject: ServerType = (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const id = req.body.id;
    const workspaceID = req.body.workspaceID;
    axios
      .post(DeezerWorkspaces + "/deleteProject", {
        id: id,
        workspaceID: workspaceID,
      })
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const EditProject: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const value = req.body.value;
    const id = req.body.id;
    const workspaceID = req.body.workspaceID;
    axios
      .post(DeezerWorkspaces + "/editProject", {
        value: value,
        id: id,
        workspaceID: workspaceID,
      })
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const AddListProjectController: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const name = req.body.name;
    const workspaceId = req.body.workspaceId;
    const projectId = req.body.projectId;
    const color = req.body.color;
    axios
      .post(DeezerWorkspaces + "/addListProject", {
        name: name,
        workspaceId: workspaceId,
        color: color,
        projectId: projectId,
      })
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const GetListProjectController: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }

    const workspaceId = req.body.id;

    axios
      .post(DeezerWorkspaces + "/getListProject", {
        id: workspaceId,
      })
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const EditListProjectController: ServerType = (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }

    const workspaceId = req.body.workspaceId;
    const id = req.body.id;
    const value = req.body.value;
    axios
      .post(DeezerWorkspaces + "/editListProject", {
        id: id,
        workspaceId: workspaceId,
        value: value,
      })
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const DeleteListProjectController: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }

    const workspaceId = req.body.workspaceId;
    const id = req.body.id;

    axios
      .post(DeezerWorkspaces + "/deleteListProject", {
        id: id,
        workspaceId: workspaceId,
      })
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const AddTask: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }

    const body = req.body;
    console.log("se esta enviando");
    axios
      .post(DeezerWorkspaces + "/addTask", body)
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const GetListTaskController: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }

    const { id } = req.body;

    axios
      .post(DeezerWorkspaces + "/getAllTask", {
        id: id,
      })
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const DragTaskController: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }

    const body = req.body;

    axios
      .post(DeezerWorkspaces + "/dragTask", body)
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const DeleteTask: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }

    const body = req.body;

    axios
      .post(DeezerWorkspaces + "/deleteTask", body)
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const editNameTask: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }

    const body = req.body;

    axios
      .post(DeezerWorkspaces + "/editNameTask", body)
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const AddFilesController: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const body = req.body;
    axios
      .post(DeezerWorkspaces + "/addFilesTask", body)
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const DeleteFilesTaskController: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const body = req.body;
    axios
      .post(DeezerWorkspaces + "/deleteFilesTask", body)
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const EditTaskController: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const body = req.body;
    axios
      .post(DeezerWorkspaces + "/editTask", body)
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const PlayTaskController: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const body = req.body;
    axios
      .post(DeezerWorkspaces + "/playTask", body)
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
export const StopTaskController: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const body = req.body;
    axios
      .post(DeezerWorkspaces + "/stopTask", body)
      .then((e) => res.status(200).json(e.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("token no valido");
  }
};
