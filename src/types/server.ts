import { Request, Response } from "express";
export type ServerType = (req: Request, res: Response) => void;
