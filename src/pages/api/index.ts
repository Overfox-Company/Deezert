import type { NextApiRequest, NextApiResponse } from "next";
import { FirstRoute } from "../../api/controllers";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  FirstRoute(req, res);
}
