interface IEditProfile {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  country?: string;
  phoneNumber?: string;
  gender?: string;
}

interface ISignIn {
  userType: string;
  email: string;
  password: string;
}

interface ICreateUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: string;
  country: string;
}
