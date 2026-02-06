import type { NextFunction, Request, Response } from "express";

export const checkContentType = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (["GET", "DELETE"].includes(req.method)) {
    return next();
  }

  if (!req.is("application/json")) {
    throw new Error("INVALID_CONTENT_TYPE");
  }

  next();
};
