import { Request, Response } from "express";
import { errResponse, sendResponse } from "./response";


export function check_required (req: Request, res: Response,required: string[]) {
  const missing_fields = required.filter(field => !req.body[field]);

  if (missing_fields.length > 0) {

    const data = {
      error: `Missing required fields: ${missing_fields.join(', ')}`
    }

    return (data);
  }

  return null;
}
