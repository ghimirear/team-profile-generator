//bringing parent Employee class

const Employee = require('./Employee');

// creating class of Engineer as a extend/(child) of employee

class Engineer extends Employee{
constructor (name, id, email, github){

  // super method to generate name id and email
    super(name, id, email);
    this.github = github;
}

// getRole function to overwrite the employee role with Engineer.
  getRole(){
      return 'Engineer';
  }

// getGithub function to return github username.
getGithub(){
    return  this.github;
  }

}
// exporting Engineer class
module.exports = Engineer