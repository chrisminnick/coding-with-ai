// a function for validating that a phone number is any valid 10-digit phone number
// returns true if valid, false if not

function validatePhoneNumber(phoneNumber) {
  // check if the phone number is a string
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  // check if the phone number is 10 digits
  if (phoneNumber.length !== 10) {
    return false;
  }

  // check if the phone number contains only numbers
  if (isNaN(phoneNumber)) {
    return false;
  }

  // if all checks pass, return true
  return true;
}
