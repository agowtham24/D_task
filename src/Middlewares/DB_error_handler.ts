import { NextFunction, Request, Response } from "express";
import { getDbConnectionStatus } from "../Sequalize_Setup";

export const blockRequestsIfDbDown = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dbStatus = getDbConnectionStatus();
  if (!dbStatus) {
    return res
      .status(503)
      .json({ message: "Service unavailable. Please try again later." });
  }
  next();
};
