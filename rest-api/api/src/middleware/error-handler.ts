import type { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

/** Catches requests that didn't match any route. Must be mounted after all routes. */
export function notFound(req: Request, res: Response): void {
  res.status(404).json({ message: "Route not found" });
}

/** Final error handler. Must be mounted last, after `notFound`. */
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({ message: "Malformed JSON body" });
    return;
  }

  logger.error("unhandled error", {
    requestId: req.requestId,
    method: req.method,
    path: req.originalUrl,
    error: err instanceof Error ? { name: err.name, message: err.message, stack: err.stack } : err,
  });
  res.status(500).json({ message: "Internal server error" });
}
