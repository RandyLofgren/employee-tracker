// TODO: Write code to define and export the Employee class
class Employee {  //The class constructor fir employees
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
    }
    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getEmail(){
        return this.email;
    }
    getRole(){
        return "Employee";
    }

  }
  module.exports = Employee;  //Allows us to export the class Employee