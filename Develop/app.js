const Manager = require("./lib/Manager");   //these allow us to communicate and pull code from the other .js
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");    //gives access to npm inquirer
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeArray = []  //this is the array we push the filled out information on employees into
const commonQuestions = type => [  //put the common questions in an array to call for "dry"ness
    {
        type: 'input',
        name: 'name',
        message: `What is the name of the ${type}?`,     //type is passing in what type of employee we are asking about
    },
    {
        type: 'input',
        name: 'email',
        message: `What is the email of the ${type}?`,
    },
    {
        type: 'input',
        name: 'id',
        message: `What is the id of the ${type}?`,
    },

]

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
function createTeam() {  //this function checks to see if directory exists and makes one if it doesnt.
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFile(outputPath, render(employeeArray), err => {  //This part of the function writes the file using the outpathPath
        if (err) {                                         // It will then call the render function using the employyeeArray info
            console.log(err)                  //logs an error if not working
            return

        } else {
            console.log("Success")            //logs Success if it works/
        }
    })
}
const next = () => {
    inquirer.prompt([                  //This is the main prompt after Manager prompt is done
        {
            type: 'list',
            message: 'What type of employee?',
            name: 'type',
            choices: ['Engineer', 'Intern', 'Done'],   //The choices that can be selected to direct what comes next.
        },

    ])
        .then((data) => {
            switch (data.type) {
                case 'Engineer':
                    makeEngineer()             //If engineer is chosen, this function will run
                    break;
                case 'Intern':
                    makeIntern()             //If intern is chosen, this function will run
                    break;
                default:
                    createTeam()         //if Done is chosen, createTeam will run
                    break;
            }
        })
}

const makeEngineer = () => {
    inquirer.prompt([...commonQuestions("engineer"), {    //This is the unique info prompt for engineers
        type: 'input',
        name: 'github',
        message: 'What is the github of the engineer?',
    }]).then(engineerInfo => {
        const constructedEngineer = new Engineer(engineerInfo.name, engineerInfo.id, engineerInfo.email, engineerInfo.github)
        employeeArray.push(constructedEngineer)    //this pushes all the info gathered into employeeArray
        next()
    })


}

const makeIntern = () => {
    inquirer.prompt([...commonQuestions("intern"),  //This is the unique info prompt for intern
    {
        type: 'input',
        name: 'school',
        message: 'What is the school of the intern?',  
    },



    ]).then(internInfo => {
        const constructedIntern = new Intern(internInfo.name, internInfo.id, internInfo.email, internInfo.school)
        employeeArray.push(constructedIntern)            //this pushes all the info gathered into the employeeArray
        next()
    })

}
const makeManager = () => {
    inquirer.prompt([...commonQuestions("Manager"),  //This is the first question prompt run and assumes there is only one manager
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the office number of the Manager?',   //This is the unique info requested of managers
    }
    ]).then(managerInfo => {
        console.log(managerInfo)
        const constructedManager = new Manager(managerInfo.name, managerInfo.id, managerInfo.email, managerInfo.officeNumber)
        employeeArray.push(constructedManager)  //this pushes the manager info into the employee array
        next()
    })
}

makeManager()    //the function that starts off them all and calls for the prompts to fill out manager info






