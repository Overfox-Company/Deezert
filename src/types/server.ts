import { Request, Response } from "express";
export type ServerType = (req: Request, res: Response) => void;
export type VerifyToken = {
  token: string;
  type: string;
};
