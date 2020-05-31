const mongoose = require('mongoose');
 
//create schema
const schema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    salary: { type: Number },
    created: { type: Date, default: Date.now }
},{
    collection: 'staffs'
});



//create model
const staff = mongoose.model('Staff', schema);


module.exports = staff;