import {Response} from "express"

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}
 interface ErrResponse<T> extends ApiResponse<T> {}

export function sendResponse <T>(res: Response, statuscode: number, success: boolean, message: string, data: T): void {
  const response: ApiResponse<T> = {
    success,
    message,
    data
  }

  res.status(statuscode).json(response);
}

export function errResponse <T>(res: Response, statuscode: number, success: boolean, message: string, data: T): void {
  const response: ErrResponse<T> = {
    success,
    message,
    data
  }

  res.status(statuscode).json(response);
}

