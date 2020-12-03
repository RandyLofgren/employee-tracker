// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee"); //This allows us to reach into the Employee Class Constructor

class Manager extends Employee { //This is extending the access of the Employee Construct to the Manager class constructor
    constructor(name, id, email, officeNumber) {
      super(name, id, email);      //This relays the questions to the manager prompt
      this.officeNumber = officeNumber;   //adds a place to store the officer number which is manager specific
      
    }
    getOfficeNumber(){                 //a method to return the office number of this specific case
        return this.officeNumber;
    }
    getRole(){                       
       return "Manager"
    }
}


module.exports = Manager     //allows us to export the manager class constructor