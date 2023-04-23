const Router = require('express');
const router = new Router();

const DataController = require('../Controllers/DataController')

router.get('/registrG35', DataController.registrG35);
router.get('/cities', DataController.cities);
router.get('/polyclinics', DataController.polyclinics);
router.get('/courses', DataController.courses);
router.get('/pitrs', DataController.pitrs);

router.post('/sendData', DataController.getData)

module.exports = router;
