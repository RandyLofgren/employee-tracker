const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeArray = []
const commonQuestions= type =>[
    {
        type: 'input',
        name: 'name',
        message: `What is the name of the ${type}?`,
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
function createTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFile(outputPath, render(employeeArray), err => {
        if (err) {
            console.log(err)
            return

        } else {
            console.log("Success")
        }
    })
}
const next = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What type of employee?',
            name: 'type',
            choices: ['Engineer', 'Intern', 'Done'],
        },

    ])
        .then((data) => {
            switch (data.type) {
                case 'Engineer':
                    makeEngineer()
                    break;
                case 'Intern':
                    makeIntern()
                    break;
                default:
                    createTeam()
                    break;
            }
        })
}

const makeEngineer = () => {
    inquirer.prompt([...commonQuestions("engineer"), {
        type: 'input',
        name: 'github',
        message: 'What is the github of the engineer?',
    }]).then(engineerInfo => {
        const constructedEngineer = new Engineer(engineerInfo.name, engineerInfo.id, engineerInfo.email, engineerInfo.github)
        employeeArray.push(constructedEngineer)
        next()
    })


}

const makeIntern = () => {
    inquirer.prompt([...commonQuestions("intern"),
        {
            type: 'input',
            name: 'school',
            message: 'What is the school of the intern?',
        },



    ]).then(internInfo => {
        const constructedIntern = new Intern(internInfo.name, internInfo.id, internInfo.email, internInfo.school)
        employeeArray.push(constructedIntern)
        next()
    })

}
const makeManager = () => {
    inquirer.prompt([...commonQuestions("Manager"),
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the office number of the Manager?',
        }
    ]).then(managerInfo => {
        console.log(managerInfo)
        const constructedManager = new Manager(managerInfo.name, managerInfo.id, managerInfo.email, managerInfo.officeNumber)
        employeeArray.push(constructedManager)
        next()
    })
}

makeManager()






// `;
//     const fileName = `${ data.title.toUpperCase().split(" ").join("") }.md`
//     fs.writeFile(fileName, readMe, (err) =>
//       err ? console.log(err) : console.log('Success!')
//     );
//   });