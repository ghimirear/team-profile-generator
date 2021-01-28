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
        // console.log(employees)
    });
   
};
// function to promt user to chhose which team member they would like to add.
 function createTeamMember(){
    inquirer.prompt([{
        type:'list',
        name : 'teamMember',
        message:'Which team member would you like to add?',
        choices: ['Manager', 'Engineer', 'Intern', 'Done with creating team.']
    }]).then(answers =>{
        // creating an switch statement(if/else) to give option to user
        // engineer or intern
        switch (answers.teamMember) {
            // on the basis of user selection calling the function to prompt the questions
            case 'Manager': createManager();
            break; 
            case 'Engineer': createEngineer();   
                break;
            case 'Intern': createIntern();
                break;
                // if user done with creating team then calling generatefile function to pass data to render function.
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
        // console.log(employees);
        })
        
    }
    //  function to  prompt the questions to create intern profile.
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
            message:`School name of intern?`,
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
       // console.log(employees);
        createTeamMember();
        
    }) 
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

