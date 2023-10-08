import {Response} from "express"
/*
 * ApiResponse: Represents a standard API response.
 * @template T: The type of the data property.
 */
interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

/*
 * ErrResponse: Represents an API response in case of an error.
 * @template T - The type of the data property.
 * @extends ApiResponse<T>
 */
 interface ErrResponse<T> extends ApiResponse<T> {}

 /**
  * sendResponse - A function to send an api response
  * @param res: the respose parameter
  * @param statuscode: the statuscode for the response
  * @param success: A boolean representaTion of the response status
  * @param message: A short description for the response
  * @param data: THe data sent along with teh response
  */
export function sendResponse <T>(res: Response, statuscode: number, success: boolean, message: string, data: T): void {
  const response: ApiResponse<T> = {
    success,
    message,
    data
  }

  res.status(statuscode).json(response);
}

 /**
  * errResponse - A function to send an api response on error
  * @param res: the respose parameter
  * @param statuscode: the statuscode for the response
  * @param success: A boolean representaTion of the response status
  * @param message: A short description for the response
  * @param data: THe data sent along with teh response
  */
export function errResponse <T>(res: Response, statuscode: number, success: boolean, message: string, data: T): void {
  const response: ErrResponse<T> = {
    success,
    message,
    data
  }

  res.status(statuscode).json(response);
}

