class Admin extends User {
    adminPrivileges: string[];
  
    constructor(id: number, name: string, email: string, adminPrivileges: string[]) {
      super(id, name, email, 'Admin');
      this.adminPrivileges = adminPrivileges;
    }
  }
  
  