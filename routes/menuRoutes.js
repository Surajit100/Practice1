const express = require('express');
const router = express.Router();

const Menu = require('../models/menu');

router.post('/', async(req, res) =>{
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

router.get('/', async(req, res) =>{
    try{
        const menuItems = await Menu.find();
        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Failed to fetch menu items' });
    }
});

module.exports = router;
