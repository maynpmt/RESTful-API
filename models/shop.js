const mongoose = require('mongoose');
 
//create schema
const schema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    photo: { type: String, default: 'nopic.png' },
    location: {
        lat: Number,
        lgn: Number
    },
},{
    toJSON: { virtuals: true },
    timestamps: true, //add created at: , updated at:
    collection: 'shops'
});

schema.virtual('menus', {
    ref: 'Menu', //link to Model names 'Menu'
    localField: '_id', //Field of model 'shop' (this file)
    foreignField: 'shop' // Field of model 'menu' (fk)
});

//create model
const shop = mongoose.model('Shop', schema);


module.exports = shop;