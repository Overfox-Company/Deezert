import { AddCompanyController } from "../../api/controllers";
import { NextApiRequest, NextApiResponse } from "next";
import { FirstSession } from "../../api/controllers";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  FirstSession(req, res);
}
