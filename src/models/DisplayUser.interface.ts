export interface DisplayUser {
  id: string;
  email: string;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  postCode: string;
  role: string;
  phoneNumber: string;
  banner?: any;
}
