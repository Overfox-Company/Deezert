import { GetCompanyOwner } from "../../api/controllers";
import { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  GetCompanyOwner(req, res);
}
