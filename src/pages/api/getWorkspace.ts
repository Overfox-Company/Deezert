import { GetWorkspaceController } from "../../api/controllers";
import { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  GetWorkspaceController(req, res);
}
