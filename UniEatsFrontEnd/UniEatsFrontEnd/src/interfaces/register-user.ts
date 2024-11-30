export interface RegisterUser {
  firstName: string; // Required, max length 50
  lastName: string; // Required, max length 50
  username: string; // Required, max length 50, alphanumeric or underscore
  password: string; // Required, max length 255
  email: string; // Required, valid email format, max length 100
  role: 'Owner' | 'Worker' | 'Customer'; // Required, specific values only
  phoneNumber?: string; // Optional, max length 15, digits only
}
