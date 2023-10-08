/**
 * getAccountNumberFromPhoneNumber - A function to generate account phoneNumber
 * from the user's phone phoneNumber.
 * @param phoneNumber: THe pone number used for the account number generation
 */
function getAccountNumberFromPhoneNumber(phoneNumber: string) {
  const strippedPhoneNumber = phoneNumber.slice(-10);

  return strippedPhoneNumber;
}

export { getAccountNumberFromPhoneNumber };
