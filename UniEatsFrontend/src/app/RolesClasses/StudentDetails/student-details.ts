// Derived classes
class Student extends User {
    studentId: string;
  
    constructor(id: number, name: string, email: string, studentId: string) {
      super(id, name, email, 'Student');
      this.studentId = studentId;
    }
  }
  
  