import type { ServerType } from "../../types/server";
import verify from "../../functions/server/TokenVerify";
import { DeezertSessions, DeezertManagement } from "../config/Microservices";
import axios from "axios";
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
