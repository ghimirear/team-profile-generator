// bringing Employee class.
const Employee = require("./Employee")
// creating Manager class as a inherit of Employee.
class Manager extends Employee{
    constructor(name, id, email, officeNumber){
        super (name, id, email);
        this.officeNumber = officeNumber;
    }
    // getRole function to return Manager role of employee.
    getRole(){
        return 'Manager';
    }
    // getofficenumber function to return officenumber of manager.
    getOfficeNumber(){
        return this.officeNumber;
    }
}
// exporting Manager class.
module.exports = Manager