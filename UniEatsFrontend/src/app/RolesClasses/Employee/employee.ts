class Employee extends User {
    employeeId: string;
  
    constructor(id: number, name: string, email: string, employeeId: string) {
      super(id, name, email, 'Employee');
      this.employeeId = employeeId;
    }
  }
  
  