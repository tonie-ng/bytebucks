import { Response } from "express";
/*
 * ApiResponse: Represents a standard API response.
 * @template T: The type of the data property.
 */
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/*
 * err_response: Represents an API response in case of an error.
 * @template T - The type of the data property.
 * @extends ApiResponse<T>
 */
interface err_response<T> extends ApiResponse<T> {}

/**
 * send_response - A function to send an api response
 * @param res: the respose parameter
 * @param statuscode: the statuscode for the response
 * @param success: A boolean representaTion of the response status
 * @param message: A short description for the response
 * @param data: THe data sent along with teh response
 */
export function send_response<T>(
  res: Response,
  statuscode: number,
  success: boolean,
  message: string,
  data: T
): void {
  const response: ApiResponse<T> = {
    success,
    message,
    data,
  };

  res.status(statuscode).json(response);
}

/**
 * err_response - A function to send an api response on error
 * @param res: the respose parameter
 * @param statuscode: the statuscode for the response
 * @param success: A boolean representaTion of the response status
 * @param message: A short description for the response
 * @param data: THe data sent along with teh response
 */
export function err_response<T>(
  res: Response,
  statuscode: number,
  success: boolean,
  message: string,
  data: T
): void {
  const response: err_response<T> = {
    success,
    message,
    data,
  };

  res.status(statuscode).json(response);
}
