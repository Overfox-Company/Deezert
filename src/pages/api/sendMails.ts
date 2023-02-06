import type { NextApiRequest, NextApiResponse } from "next";
import { SendMails } from "../../api/controllers";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  SendMails(req, res);
}
