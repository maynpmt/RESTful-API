const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

//create schema
const schema = Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number},
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' }
},{
    toJSON: { virtuals: true },
    timestamps: true, //add created at: , updated at:
    collection: 'menus'
});

schema.virtual('price_vat').get( function () {
    return (this.price*0.07)+this.price;
})

//create model
const menu = mongoose.model('Menu', schema);


module.exports = menu;