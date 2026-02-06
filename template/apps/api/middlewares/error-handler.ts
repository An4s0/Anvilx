import type { NextFunction, Request, Response } from "express";
import { GlobalErrors } from "@/errors";
import { normalizeErrors } from "@/utils/normalize-errors";

export const allErrors = {
  ...normalizeErrors(GlobalErrors),
} as const;

type KnownErrorKey = keyof typeof allErrors;

const sendError = (
  res: Response,
  code: KnownErrorKey,
  fields?: Record<string, string>,
) => {
  const e = allErrors[code];

  const response = {
    success: false,
    data: null,
    error: {
      code,
      message: e.message,
      ...(fields && { fields }),
    },
  };

  return res.status(e.statusCode).json(response);
};

export function ErrorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  // Known errors
  const errorKey =
    typeof err === "string" ? err : err instanceof Error ? err.message : null;
  if (errorKey && errorKey in allErrors) {
    return sendError(res, errorKey as KnownErrorKey);
  }

  // Dev logging
  if (process.env.NODE_ENV === "development") {
    console.error("\x1b[31mX Error caught:\x1b[0m", err);
  }

  return sendError(res, "INTERNAL_SERVER_ERROR");
}
