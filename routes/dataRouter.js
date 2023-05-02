const Router = require('express');
const router = new Router();

const DataController = require('../Controllers/DataController')

//init registers
router.get('/registrG35', DataController.registrG35);
router.get('/registrInterPnevm', DataController.registrInterPnevm)
router.get('/registrBronchPulm', DataController.registrBronchPulm)

// table components G35
router.get('/cities', DataController.cities);
router.get('/polyclinics', DataController.polyclinics);
router.get('/courses', DataController.courses);
router.get('/pitrs', DataController.pitrs);

//table components InterPnevm
router.get('/coursePulm', DataController.coursePulm)

//table components BronchPulm
router.get('/allergIllness', DataController.allergIllness)
router.get('/choicePreparatOnBit', DataController.choicePreparatOnBit)
router.get('/bazisTherapy', DataController.bazisTherapy)
router.get('/baCourseIllness', DataController.baCourseIllness)
router.get('/cardioPatolog', DataController.cardioPatolog)

//send data of registers
router.post('/sendData', DataController.getData)
router.post('/sendDataRegInterPnevm', DataController.sendDataRegInterPnevm)
router.post('/sendDataRegBronchPulm', DataController.sendDataRegBronchPulm)



module.exports = router;
