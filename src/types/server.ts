import type { NextApiRequest, NextApiResponse } from "next";
export type ServerType = (req: NextApiRequest, res: NextApiResponse) => void;
export type VerifyToken = {
  token: string;
  type: string;
};
