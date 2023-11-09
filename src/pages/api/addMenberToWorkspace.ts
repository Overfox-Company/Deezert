import { AddMenbersController } from "../../api/controllers";
import { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    AddMenbersController(req, res);
}
