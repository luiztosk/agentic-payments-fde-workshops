import type { NextFunction, Request, Response } from "express";

const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

/**
 * Allows only ALLOWED_ORIGIN and short-circuits preflight (OPTIONS) requests.
 * Vary: Origin tells caches not to reuse this response for a different Origin.
 */
export function cors(req: Request, res: Response, next: NextFunction): void {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
}
