const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    department: String,
    position: String,
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
