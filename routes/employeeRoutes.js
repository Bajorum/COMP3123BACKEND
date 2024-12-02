const express = require('express');
const mongoose = require('mongoose');
const Employee = require('../models/Employee'); // Ensure the Employee model exists
const router = express.Router();

// GET all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find(); // Fetch all employees from the database
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error.message);
        res.status(500).json({ message: 'Server error while fetching employees' });
    }
});

// GET employee by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid employee ID format' });
    }

    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error.message);
        res.status(500).json({ message: 'Server error while fetching employee' });
    }
});

// CREATE new employee
router.post('/', async (req, res) => {
    const { firstName, lastName, email, position, salary } = req.body;

    try {
        // Validate input data
        if (!firstName || !lastName || !email || !position || !salary) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newEmployee = new Employee({ firstName, lastName, email, position, salary });
        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (error) {
        console.error('Error creating employee:', error.message);
        res.status(500).json({ message: 'Server error while creating employee' });
    }
});

// UPDATE employee
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, position, salary } = req.body;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid employee ID format' });
    }

    try {
        // Update employee
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { firstName, lastName, email, position, salary },
            { new: true, runValidators: true } // Return updated document and validate updates
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
        console.error('Error updating employee:', error.message);
        res.status(500).json({ message: 'Server error while updating employee' });
    }
});

// DELETE employee
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid employee ID format' });
    }

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
    } catch (error) {
        console.error('Error deleting employee:', error.message);
        res.status(500).json({ message: 'Server error while deleting employee' });
    }
});

module.exports = router;
