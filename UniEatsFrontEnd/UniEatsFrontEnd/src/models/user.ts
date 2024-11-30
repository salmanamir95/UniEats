export interface User {
  userId: number; // Unique identifier for the user
  firstName: string; // First name of the user, max length 50
  lastName: string; // Last name of the user, max length 50
  username: string; // Username for the user, must be alphanumeric or underscores
  password: string; // Password for the user, max length 255
  email: string; // Email of the user, must be a valid email address
  role: 'Owner' | 'Worker' | 'Customer'; // Role of the user, must be one of the three options
  phoneNumber?: string; // Optional phone number, max length 15 and only digits allowed
  createdAt?: Date; // The date when the user was created, defaults to current date
}
