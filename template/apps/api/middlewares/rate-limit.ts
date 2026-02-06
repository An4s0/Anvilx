import type { NextFunction, Request, Response } from "express";

const MAX_REQUESTS = 500;
const WINDOW_SIZE = 15 * 60 * 1000;

const rateLimitMap = new Map<string, { count: number; startTime: number }>();

export const RateLimiter = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ip =
    typeof forwarded === "string"
      ? forwarded.split(",")[0].trim()
      : (req.ip ?? "unknown");

  const now = Date.now();
  const rateLimitData = rateLimitMap.get(ip)!;

  // First request from this IP
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, startTime: now });
    return next();
  }

  // Reset window if expired
  if (now - rateLimitData.startTime > WINDOW_SIZE) {
    rateLimitMap.set(ip, { count: 1, startTime: now });
    return next();
  }

  // Allow request if under limit
  if (rateLimitData.count < MAX_REQUESTS) {
    rateLimitData.count++;
    return next();
  }

  throw new Error("TOO_MANY_REQUESTS");
};
