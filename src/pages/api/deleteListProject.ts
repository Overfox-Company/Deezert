import { DeleteListProjectController } from "../../api/controllers";
import { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  DeleteListProjectController(req, res);
}
