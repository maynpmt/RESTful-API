const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

const passportJWT = require('../middleware/passportJWT');

/* http://localhost/staff/ */
router.get('/', [ passportJWT.isLogin ], staffController.index);

/*get buyid */
/* http://localhost/staff/5ec90c47dbc3be03623b635d */
router.get('/:id', staffController.show);

/* http://localhost/staff/ */
router.post('/', staffController.insert);

/* delete by id */
/* http://localhost/staff/5ec90c47dbc3be03623b635d */
router.delete ('/:id', staffController.destroy);

/* update by id */
/* http://localhost/staff/5ec90c47dbc3be03623b635d */
router.put ('/:id', staffController.update);


module.exports = router;