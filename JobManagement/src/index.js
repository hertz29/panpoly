var express = require('express');
var cors = require('cors');


const jobsRouter = require('./routers/jobsRouter');

const JobFetcher = require('./jobManagment/fetcher');

var app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/jobs', jobsRouter);    

app.listen(5000,async ()=>{
    console.log('Jobs Managment is listening to port 5000');
    JobFetcher.loop();

})


module.exports = app;

 
 