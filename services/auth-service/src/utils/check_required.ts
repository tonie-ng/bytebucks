import { Request, Response } from "express";
import { err_response, send_response } from "./response";

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
function check_required(req: Request, required: string[]) {
  const missing_fields = required.filter((field) => !req.body[field]);

  if (missing_fields.length > 0) {
    const data = {
      error: `Missing required fields: ${missing_fields.join(", ")}`,
    };

    return data;
  }

  return null;
}

/**
 * remove_field - A function to remove a field from an object
 * (I mostly use this to remove the password from the api response)
 * @param obj: An object
 * @param fieldToRemove: A field within the object that should be removed
 *
 * @returns: The object but this time without the removed field.
 */
function remove_field<T>(
  obj: T,
  fieldToRemove: keyof T
): Omit<T, typeof fieldToRemove> {
  const { [fieldToRemove]: removedField, ...restOfObject } = obj;
  return restOfObject as Omit<T, typeof fieldToRemove>;
}

export { check_required, remove_field };
