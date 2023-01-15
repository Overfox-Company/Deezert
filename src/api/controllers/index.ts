import type { ServerType } from "../../types/server";

// Define the FirstRoute function as a ServerType
export const FirstRoute: ServerType = async (req, res) => {
  try {
    console.log(req.headers.authorization);
    // Send a status of 200 and a message to the client
    res.status(200).send("servidor funcionando je");
  } catch (error) {
    // Log any errors that occur
    console.log(error);
  }
};
