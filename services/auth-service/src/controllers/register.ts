import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Request, Response } from "express";
import { Token, User } from "../models";
import { check_required, errResponse, generate_acc_no, sendResponse } from "../utils";
import {RegistrationRequest} from "../interfaces";

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

    const requiredFields = ['first_name', 'last_name', 'gender', 'email', 'password', 'phone_number', 'repeatpassword'];

    const mdata = check_required(req, res, requiredFields);

    if (mdata != null) {
      return errResponse(res, 400, false, "Bad Request", mdata);
    }

    if (password !== repeatpassword) {
      return errResponse(res, 400, false, "Bad Request", `${password} and ${repeatpassword} do not match`);
    }

    if (!phoneNumberPattern.test(String(phone_number))) {
      return (errResponse
              (res, 400, false, "Invalid phone number", 
               {error: `${phone_number} does not conform to the format` }
              )
             );
    }

    const existing_user = await User.findOne({
       $or: [
        { email: email.toLowerCase() },
        { phone_number: phone_number.toLowerCase() },
      ],
    });
    if (existing_user) {
      return (errResponse(res, 409, false, "Duplicate user", {error: `User already exists`}));
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
    const data = removeField(saved_user, "authentication");
    return sendResponse(res, 200, true, "Registration Successfull", data);
  } catch (error) {
    return errResponse(res, 500, false, "Internal server error", error.message)
  }
}

/**
 * removeField - A function to remove a field from an object
 * (I mostly use this to remove the password from the api response)
 * @param obj: An object
 * @param fieldToRemove: A field within the object that should be removed
 *
 * @returns: The object but this time without the removed field.
 */
function removeField<T>(obj: T, fieldToRemove: keyof T): Omit<T, typeof fieldToRemove> {
  const { [fieldToRemove]: removedField, ...restOfObject } = obj;
  return restOfObject as Omit<T, typeof fieldToRemove>;
}

export { register };
