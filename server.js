const express = require('express');
const app = express();
const db = require('./db'); 
const Person = require('./models/person');
const Menu = require('./models/menu');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/people', async (req, res) => {
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

app.post('/menu', async(req, res) =>{
    try{
        const data =req.body;
        const newMenu = new Menu(data);
        const saveMenu = await newMenu.save();
        console.log('New menu created:', saveMenu);
        res.status(201).json(saveMenu);
    } catch (error) {
        console.error('Error creating menu:', error);
        res.status(500).json({ error: 'Failed to create menu' });
    }
});

app.get('/menu', async(req, res) =>{
    try{
        const menuItems = await Menu.find();
        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Failed to fetch menu items' });
    }
});

//peramiterized route
app.get('/people/:works', async(req, res) =>{
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

app.listen(3000, () => {
  console.log('Server is running on port 3000: http://localhost:3000');
});