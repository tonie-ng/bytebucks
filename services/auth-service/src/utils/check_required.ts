import { Request, Response } from "express";
import { errResponse, sendResponse } from "./response";

/**
 * check_required: A function used to check if a request contains
 * all the required missing_fields
 * @param req: The user's request object.
 * @param res: The user's response object.
 * @param required: An array of strings containing teh required 
 * properties
 *
 * @return: An data object containing an error message and the missing
 * fields.
 */
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
