// Factory class
class UserFactory {
    static createUser(id: number, name: string, email: string, designation: string, additionalInfo: any): User {
      switch (designation) {
        case 'Student':
          return new Student(id, name, email, additionalInfo.studentId);
        case 'Employee':
          return new Employee(id, name, email, additionalInfo.employeeId);
        case 'Admin':
          return new Admin(id, name, email, additionalInfo.adminPrivileges);
        default:
          throw new Error('Invalid designation');
      }
    }
  }
  
  // Example usage
  const student = UserFactory.createUser(
    1,
    'John Doe',
    'john@example.com',
    'Student',
    { studentId: 'S12345' }
  );
  
  const employee = UserFactory.createUser(
    2,
    'Jane Doe',
    'jane@example.com',
    'Employee',
    { employeeId: 'E12345' }
  );
  
  const admin = UserFactory.createUser(
    3,
    'Admin User',
    'admin@example.com',
    'Admin',
    { adminPrivileges: ['create', 'read', 'update', 'delete'] }
  );
  