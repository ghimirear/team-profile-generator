// TODO: Write code to define and export the Employee class
class  Employee{
    // every employee has name id and email so this parent function Employee will generate and export.
    constructor(name, id, email){
        this.name= name;
        this.id = id;
        this.email= email;
    }
    // getname function to return employee name
    getName(){
        return this.name;
    }
    // getId function to return id
    getId (){
        return this.id;
    }
    // getEmail function to return email
    getEmail(){
        return this.email;
    }
    // getRole function to return employee as primary position.
    getRole(){
        return 'Employee'
    }
}
module.exports = Employee