const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    taste:{
        type: String,
        enum: ['Spicy', 'Sweet', 'Sour', 'Salty', 'Bitter'],
        required: true  
    },
    is_vegetarian: {
        type: Boolean,
        required: true
    },
    ingredients: {
        type: [String],
        default: []
    },
    number_of_orders: {
        type: Number,
        default: 0
    }

});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;