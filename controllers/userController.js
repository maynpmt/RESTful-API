const User = require('../models/user')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config/index')


//property index  is function
exports.index = (req, res, next) => {
    res.status(200).json({ message: 'Hello Users' });
}

exports.register = async(req, res, next) => {
    try {
            const { name, email, password } = req.body;

            // validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const error = new Error('ข้อมูลไม่ถูกต้อง');
                error.statusCode = 422;
                error.validation = errors.array();
                throw error;
            }

            //  เราควรที่จะเช็คก่อน สมมติว่าถ้ามีเมลล์ซ้ำมันไม่ควรเพิ่มลงฐานข้อมูลได้ ก่อน save อพ
            // check email ซ้ำ
            const existEmail = await User.findOne({ email: email })
            if(existEmail){
                const error = new Error('email นี้มีผู้ใช้งานแล้ว ลองใหม่อีกครั้ง');
                error.statusCode = 400;
                throw error;
            }

            let user = new User();
            user.name = name;
            user.email = email;
            user.password = await user.encryptPassword(password); //ก่อน assign password จะต้องถูกเข้ารหัสก่อน

            await user.save();

            res.status(201).json({ 
                message: 'ลงทะเบียนสำเร็จ' 
            });
    } catch (error) {
        next(error);
    }
  }


exports.login =async (req, res, next) => {

    try {
            const { email, password } = req.body;

            // checkว่ามี emailนี้ในระบบหรือไม่
            const user = await User.findOne({ email: email })
            if(!user){ //ไม่เจอ
                const error = new Error('ไม่พบผู้ใช้งานในระบบ');
                error.statusCode = 404;
                throw error;
            }
            //เจอ check pwd ต่อ
            //ตรวจสอบว่ารหัสผ่านตรงกันหรือไม่ ถ้าไม่ตรงให้โยน error ออกไป
            const isValid = await user.checkPassword(password);
            if(!isValid){
                const error = new Error('รหัสผ่านไม่ถูกต้อง');
                error.statusCode = 401;
                throw error;
            }

            //สร้าง token
            const token = await jwt.sign({
                id: user._id,
                role: user.role
            }, config.JWT_SECRET, { expiresIn: '5 days'});
            
             //  decode วันหมดอายุ
             const expires_in = jwt.decode(token);

            return res.status(200).json({ 
                access_token: token,
                expires_in: expires_in.exp,
                token_type: 'Bearer' 
            });

    } catch (error) {
        next(error);
    }
  }

  //get profile 
  exports.me = (req, res, next) => {
    const { _id, name, email, role } = req.user
    res.status(200).json({ 
        //user: req.user
        user: {
            id: _id,
            name: name,
            email: email,
            role: role
        }
    });
}