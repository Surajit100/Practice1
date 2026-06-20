const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.post('/', async (req, res) => {
  try {
    // const { name, age, email, work, address } = req.body;
    const data = req.body;

    const newPerson = new Person(data);
    const savedPerson = await newPerson.save();
    console.log('New person created:', savedPerson);
    res.status(201).json(savedPerson);
  } catch (error) {
    console.error('Error creating person:', error);
    res.status(500).json({ error: 'Failed to create person' });
  }
});

router.get('/:works', async(req, res) =>{
    try{
        const workType = req.params.works;
        if(['Developer', 'Designer', 'Manager', 'Other'].includes(workType)){
            const people = await Person.find({ work: workType });
            res.status(200).json(people);
        }
        else {
            res.status(400).json({ error: 'Invalid work type' });
        }
    } catch (error) {
        console.error('Error fetching people by work type:', error);
        res.status(500).json({ error: 'Failed to fetch people by work type' });
    }
});

router.put('/:id', async(req, res) =>{
    try{
        const personId = req.params.id;
        const updatedData = req.body;
        const updatedPerson = await Person.findByIdAndUpdate(personId, updatedData, { new: true });
        res.status(200).json(updatedPerson);
    } catch (error) {
        console.error('Error updating person:', error);
        res.status(500).json({ error: 'Failed to update person' });
    }
});

router.delete('/:id', async(req, res) =>{
    try{
        const personId = req.params.id;
        await Person.findByIdAndDelete(personId);
        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (error) {
        console.error('Error deleting person:', error);
        res.status(500).json({ error: 'Failed to delete person' });
    }   
});


module.exports = router;
