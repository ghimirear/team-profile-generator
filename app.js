const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// creating an empty object to store all the team members.
const employees = [];

// inquirer to gather information about the development team members,
// start with the manager
function init(){

createManager();
function createManager(){
    console.log('Please build your team')
    inquirer.prompt([
        {
            type:'input',
            name :'managerName',
            message :'what is the name of team manager?',
            validate: answer =>{if (answer!== '') {
                return true;  
                }
            else{
                return 'Please provide the name of the team manager.';
            }
        } 
    },
    {
        type: 'input',
        name:'managerId',
        message :'Manager ID no.',
        validate: answer =>{
            const correct = answer.match(/^[1-9]\d*$/)
            if (correct) {
               return true 
            }
            else{
                return 'Please enter a valid number.'
            }
        }
    },
    {
        type: 'input',
        name : 'managerEmail',
        message : 'Manager email address?',
        validate: answer =>{
            const correct = answer.match(/\S+@\S+\.\S+/);
            if (correct) {
                return true
                
            }
            else{
                return 'Please enter a valid email address.'
            }
        }
    },
    {
        type :'input',
        name :'managerOfficeNumber',
        message :'Office number of manager.',
        validate: answer =>{
            const correct = answer.match(/^[1-9]\d*$/)
            if (correct) {
                return true  
            }
            else {
                return 'Please enter a valid office number'
            }
        }
    }
    ])
    .then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
        employees.push (manager);
        createTeamMember()
        console.log(employees)
    });
   
};
// function to promt user to chhose which team member they would like to add.
 function createTeamMember(){
    inquirer.prompt([{
        type:'list',
        name : 'teamMember',
        message:'Which team member would you like to add?',
        choices: ['Engineer', 'Intern', 'Done with creating team.']
    }]).then(answers =>{
        // creating an switch statement(if/else) to give option to user
        // engineer or intern
        switch (answers.teamMember) {
            case 'Engineer': createEngineer();
                
                break;
        
            case 'Intern': createIntern();
                break;
            case 'Done with creating team.': generatefile();
        }
    })
 };
// function to create engineer profile.
function createEngineer(){
inquirer.prompt([
            {
            type: 'input',
            name:'engineerName',
            message : 'Name of engineer.. ',
            validate: answer =>{if (answer!== '') {
                    return true   
                    }
                else{
                    return 'Please provide the name of the engineer.'
                }
                }     
            },
            {
                type :'input',
                name :'engineerId',
                message: 'Enter engineer ID',
                validate: answer =>{
                    const correct = answer.match(/^[1-9]\d*$/)
                    if (correct) {
                        return true  
                    }
                    else {
                        return 'Please enter a valid ID number'
                    }
                }
            },
            {
                type: 'input',
                name : 'github',
                message :'Github userNmae of engineer',
                validate: answer =>{if (answer!== '') {
                    return true   
                    }
                else{
                    return 'Please provide the github username of engineer.'
                }
                }
            },
            {
                type:'input',
                name :'engineerEmail',
                message :'Please enter email of engineer.',
                validate: answer =>{
                    const correct = answer.match(/\S+@\S+\.\S+/);
                    if (correct) {
                        return true   
                    }
                    else{
                        return 'Please enter a valid email address.'
                    }
                }
            }
        ])
        .then(answers =>{
            // creating an array of object on the basis of user response/answers and then pushing that object to teammember.
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.github);
        employees.push(engineer);
        createTeamMember();
        console.log(employees);
        })
        
    }
    function createIntern(){
    inquirer.prompt([
        {
            type:'input',
            name :'internName',
            message :'name of intern?',
            validate: answer =>{if (answer!== '') {
                return true   
                }
            else{
                return 'Please provide the name of Intern.'
            }
            }

        },
        {
            type:'input',
            name :'internId',
            message:'Intern ID?',
            validate: answer =>{
                const correct = answer.match(/^[1-9]\d*$/)
                if (correct) {
                    return true  
                }
                else {
                    return 'Please enter a valid ID number'
                }
            }
        },
        {
            type:'input',
            name:'internEmail',
            message:'Intern e-mail address?',
            validate: answer =>{
                const correct = answer.match(/\S+@\S+\.\S+/);
                if (correct) {
                    return true   
                }
                else{
                    return 'Please enter a valid email address.'
                }
            }
        },
        {
            type:'input',
            name:'internSchool',
            message:`School name of intern school?`,
            validate: answer =>{if (answer!== '') {
                return true   
                }
            else{
                return 'Please provide the school name of Intern.'
            }
            }
        }
    ])
.then(answers =>{
        const intern = new Intern (answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        employees.push(intern);
        console.log(employees);
        createTeamMember();
        
    })
// calling createTeamMember function to give use a option of continue done with creating team member.
    
}
}
init()

async function generatefile(){
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile('./output/team.html',render(employees),function(err){
        
        if(err){
            throw error;
        }
        {
            console.log('your file is generated.')
        }
    })
}

 
 

// creating an function to prompt user 
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
