const express = require('express');
const router = express.Router();
const conroller = require('../conrollers/JobController');

router.post('/executeJob', conroller.executeJob);

router.get('/',conroller.getJobs);


module.exports = router;