const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
//create schema
const schema = new mongoose.Schema({
    name: {
        type: String, required: true, trim: true
    },
    email: { 
        type: String, required: true, trim: true, unique: true, index: true
    },
    password: {
        type: String, required: true, trim: true, minlength: 3
    },
    role: {
        type: String, default: 'member'
    }

},{ 
    collation: 'users' 
});
 
//special of mongoose
//เราจะเขียนฟังก์ชันที่รับพารามิเตอร์เป็น password แล้ว return เป็น password ที่เข้ารหัสแล้วไปเก็บไว้ในฐานข้อมูล
schema.methods.encryptPassword = async function(password) {
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

// ใช้bcryptjs ในการ check โดยใช้ฟังก์ชัน compare
schema.methods.checkPassword = async function(password) {
   const isValid = await bcrypt.compare(password, this.password);
   return isValid;
}




//create model
const user = mongoose.model('User', schema);


module.exports = user;