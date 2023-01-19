import type { ServerType } from "../../types/server";
import verify from "../../functions/server/TokenVerify";
// Define the FirstRoute function as a ServerType
export const FirstRoute: ServerType = async (req, res) => {
  try {
    // Send a status of 200 and a message to the client
    res.status(200).send("servidor funcionando je");
  } catch (error) {
    // Log any errors that occur
    console.log(error);
  }
};
export const SignInController: ServerType = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(404).send("token no valido");
      throw new Error("Invalid Token");
    }
    const token = req.headers.authorization.split(" ")[1];
    const type = "google";
    console.log("se va a verfificar el token");
    let result = await verify({ token, type });
    console.log(result);
    // Send a status of 200 and a message to the client
    res.status(200).send("token valido");
  } catch (error) {
    // Log any errors that occur
    console.log(error);
    res.status(404).send("token no valido");
  }
};
