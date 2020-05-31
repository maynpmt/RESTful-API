const mongoose = require('mongoose');
 
//create schema
const schema = new mongoose.Schema({
    name: String,
    address: {
        province:  String 
    },
});



//create model
const company = mongoose.model('Companys', schema);


module.exports = company;