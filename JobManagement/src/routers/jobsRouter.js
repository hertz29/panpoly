const express = require('express');
const router = express.Router();
const controller = require('../controllers/jobContoller');


router.post('/createJob', controller.createJob);

router.get('/getLogs', controller.getLogs);

router.post('/clearJobs', controller.clearJobs);


module.exports = router;