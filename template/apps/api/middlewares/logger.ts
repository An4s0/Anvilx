import type { NextFunction, Request, Response } from "express";

export const Logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const statusIcon =
      res.statusCode < 400
        ? "\x1b[92m✓\x1b[0m"
        : res.statusCode < 500
          ? "\x1b[93m!\x1b[0m"
          : "\x1b[31mX\x1b[0m";

    if (process.env.NODE_ENV === "development") {
      console.log(
        ` ${statusIcon} ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
      );
    }
  });
  next();
};
