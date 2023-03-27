const Manager = require("./lib/manager.js");
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const generateTeam = require("./src/template.js");

const teamArray = [];

function runApp() {
  const addEmployee = async (role) => {
    const questions = [
      {
        type: "input",
        name: "name",
        message: `What is the ${role.toLowerCase()}'s name?`,
      },
      {
        type: "input",
        name: "id",
        message: `What is the ${role.toLowerCase()}'s employee ID number?`,
      },
      {
        type: "input",
        name: "email",
        message: `What is the ${role.toLowerCase()}'s email address?`,
      },
    ];

    if (role === "Manager") {
      questions.push({
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?",
      });
    } else if (role === "Engineer") {
      questions.push({
        type: "input",
        name: "github",
        message: "What is the engineer's GitHub username?",
      });
    } else if (role === "Intern") {
      questions.push({
        type: "input",
        name: "school",
        message: "What school does the intern attend?",
      });
    }

    const answers = await inquirer.prompt(questions);

    let employee;
    if (role === "Manager") {
      employee = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
    } else if (role === "Engineer") {
      employee = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
    } else if (role === "Intern") {
      employee = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
    }

    teamArray.push(employee);
  };

  const createTeam = async () => {
    let addAnother = true;
    do {
      const { role } = await inquirer.prompt([
        {
          type: "list",
          name: "role",
          message: "What type of employee would you like to add to your team?",
          choices: ["Manager", "Engineer", "Intern", "No more team members are needed."],
        },
      ]);
      if (role === "No more team members are needed.") {
        addAnother = false;
      } else {
        await addEmployee(role);
      }
    } while (addAnother);

    console.log("Team created!");
    fs.writeFileSync(outputPath, generateTeam(teamArray), "UTF-8")
}

createTeam();

}

runApp();
