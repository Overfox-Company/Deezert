import type { ServerType } from "../../types/server";
import verify from "../../functions/server/TokenVerify";
import { DeezertSessions } from "../config/Microservices";
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
