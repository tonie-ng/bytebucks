/**
 * An interface that represents the request for registration.
 * This defines the fields taht the registration should conform to.
 */
export interface RegistrationRequest {
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
