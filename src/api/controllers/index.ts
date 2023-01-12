import type { ServerType } from "../../types/server";
export const FirstRoute: ServerType = async (req, res) => {
  try {
    res.status(200).send("servidor funcionando je");
  } catch (error) {
    console.log(error);
  }
};
