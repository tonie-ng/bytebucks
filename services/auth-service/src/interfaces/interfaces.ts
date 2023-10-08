/**
 * An interface that represents the request for registration.
 * This defines the fields that the registration should conform to.
 */
interface RegistrationRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  gender: string;
  address: string;
  phone_number: string;
  repeatpassword: string;
  date_of_birth: string;
}

/**
 * LoginRequest -  An interfgace that represents the request 
 * body during login
 */
interface LoginRequest {
  email: string;
  password: string;
}

/**
 * An interface that represents the user document in the database
 */
interface IUser {
  first_name: string;
  last_name: string;
  other_name?: string;
  email: string;
  authentication: {
    password: string;
  };
  account_number: string;
  account_balance: string;
  gender: string;
  address: string;
  phone_number: string;
  verified: boolean;
  date_of_birth: Date;
  _doc?: any;
}


export {RegistrationRequest, LoginRequest, IUser}
