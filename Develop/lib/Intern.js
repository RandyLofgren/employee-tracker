// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");  //This allows us to reach into the Employee Class Constructor

class Intern extends Employee {   //Here we are adding the intern specific questions to the Employee questions
    constructor(name, id, email, school) {
      super(name, id, email);
      this.school = school;
      
    }
    getSchool(){
        return this.school;
    }
    getRole(){
       return "Intern"
    }
}


module.exports = Intern  //Allows us to export the intern prompts/questions as well as filter the employee  questions through this