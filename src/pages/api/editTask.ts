import { EditTaskController } from "../../api/controllers";
import { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  EditTaskController(req, res);
}
