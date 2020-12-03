// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");  //allows us to grab the main attributes and then also add the engineer specific ones when we call it

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;

  }
  getGithub() {
    return this.github;
  }
  getRole() {
    return "Engineer"
  }
}


module.exports = Engineer  //Allows us to export the engineer specific questions