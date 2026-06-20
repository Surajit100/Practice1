const express = require('express');
const app = express();
const db = require('./db'); 
const Person = require('./models/person');
const Menu = require('./models/menu');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000: http://localhost:3000');
});