import bcrypt from "bcryptjs";
import jwt, {  } from "jsonwebtoken";
import { Request, Response } from "express";
import { IUser, LoginRequest } from "../interfaces";
import { Token, User } from "../models";
import { check_required, err_response, remove_field, send_response } from "../utils";

/**
 * login: A function that handles user login process
 * @param req: The user's request object.
 * @param res: The user's response object
 *
 * @returns: A success or error response object depending on the success of the request
 */
async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as LoginRequest;

    const required_fields = ["email", "password"];

    const check_data = check_required(req, required_fields);
    if (check_data != null) {
      return err_response(res, 400, false, "Bad Request", check_data);
    }

    const user = await User.findOne({ email });
    if (!user) {
      return err_response(
        res,
        404,
        false,
        "User not found",
        {error: `User with ${email} not found. You can proceed to signup`}
      )
    }


    const max_age = 3 * 60 * 60; 3 /* 3 hours */
    const validated_password = await bcrypt.compare(password, user.authentication.password); 
    if (!validated_password) {
      return err_response(res, 401, false, "Authentication failed", {error: `The password provided is incorrect`})
    }

    const access_token = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: max_age,
      }
    );

    const data = remove_field(user._doc, "authentication");
    return (
      res.cookie("jwt", access_token, {
        httpOnly: true,
        maxAge: max_age * 1000,
      }),

      send_response(res, 200, true, "Login successful", data)
    )

  } catch (error) {
    return err_response(
      res,
      500,
      false,
      "Internal server error",
      error.message
    );
  }
}

export { login };
