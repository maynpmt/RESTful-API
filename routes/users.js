const express = require('express');
const { body } = require('express-validator')

const router = express.Router();
const userController = require('../controllers/userController');
const passportJWT = require('../middleware/passportJWT')
/* GET users listing. */
/* http://localhost:3000/user/ */
router.get('/', userController.index);

/* http://localhost:3000/user/login */
router.post('/login', userController.login);

/* http://localhost:3000/user/login */
router.post('/register',[
    body('name').not().isEmpty().withMessage('กรุณาป้อนข้อมูลชื่อ - สกุลด้วย'),
    body('email').not().isEmpty().withMessage('กรุณากรอกอีเมลล์ด้วย').isEmail().withMessage('รูปแบบอีเมลล์ไม่ถูกต้อง'),
    body('password').not().isEmpty().withMessage('กรุณากรอกรหัสผ่านด้วย').isLength({min: 3}).withMessage('รหัสผ่าน 3 ตัวอักษรขึ้นไป')
 ] , userController.register);

 /* http://localhost:3000/user/login */
router.get('/me', [ passportJWT.isLogin ],userController.me);

module.exports = router;
