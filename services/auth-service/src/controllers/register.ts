import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { RegistrationRequest } from "../interfaces";
import { Token, User } from "../models";
import {
  check_required,
  err_response,
  generate_acc_no,
  remove_field,
  send_response,
} from "../utils";

const phoneNumberPattern = /^0[987][01][0-9]{8}$/;

/**
 * register - Function that handles registration process.
 * @param req: User's request object.
 * @param res: User's response object.
 * @returns: A success or error response object depending on the success of the request
 */
async function register(req: Request, res: Response) {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      gender,
      address,
      phone_number,
      repeatpassword,
      date_of_birth,
    } = req.body as RegistrationRequest;

    const required_fields = [
      "first_name",
      "last_name",
      "gender",
      "email",
      "password",
      "phone_number",
      "repeatpassword",
    ];

    const mdata = check_required(req, required_fields);

    if (mdata != null) {
      return err_response(res, 400, false, "Bad Request", mdata);
    }

    if (password !== repeatpassword) {
      return err_response(
        res,
        400,
        false,
        "Bad Request",
        `${password} and ${repeatpassword} do not match`
      );
    }

    if (!phoneNumberPattern.test(String(phone_number))) {
      return err_response(res, 400, false, "Invalid phone number", {
        error: `${phone_number} does not conform to the format`,
      });
    }

    const existing_user = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { phone_number: phone_number.toLowerCase() },
      ],
    });
    if (existing_user) {
      return err_response(res, 409, false, "Duplicate user", {
        error: `User already exists`,
      });
    }

    // Over here I'll have to create a functionality to authenticate Token sent to the user's email

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const account_number = generate_acc_no(phone_number);
    const new_user = new User({
      first_name: first_name.toLowerCase(),
      last_name: last_name.toLowerCase(),
      email: email.toLowerCase(),
      authentication: { password: hashedPassword },
      phone_number: phone_number.toLowerCase(),
      account_balance: "0.00",
      verified: true, //this will change once I get the auth service up and running
      account_number,
    });

    const saved_user = await new_user.save();
    const data = remove_field(saved_user, "authentication");
    return send_response(res, 200, true, "Registration Successfull", data);
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

export { register };
