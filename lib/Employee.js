// TODO: Write code to define and export the Employee class
class  Employee{
    constructor(name, id, email){
        this.name= name;
        this.id = id;
        this.email= email;
    }
    getname(){
        return this.name;
    }
    getid (){
        return this.id;
    }
    getemail(){
        return this.email;
    }
    getrole(){
        return 'Employee'
    }
}
module.exports = Employee