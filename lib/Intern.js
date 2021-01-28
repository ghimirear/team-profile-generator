// bringing employee 
 const Employee = require('./Employee');
 // creating class of intern as a inherit of employee class.
 class Intern extends Employee{
     constructor(name, id, email, school){
     super(name, id, email);
     this.school = school;
    }
    // getRole function to overrite the Employee role.
    getRole(){
        return 'Intern';
    }
    // getSchool function to return inteern school name
    getSchool(){
        return this.school;
    }

 }
 // exporting intern class
 module.exports = Intern