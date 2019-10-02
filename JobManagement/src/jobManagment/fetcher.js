
const JobModel = require('./model');
const commonFunctions = require('../commonFunctions');

JobModel.getJobCollection();

const loop = async ()=>{
    await sleep(fetchJob);
    process.nextTick(loop);
}

const fetchJob = ()=>{

    let job;
    jobCollection = JobModel.getJobCollection();
    if(jobCollection.isEmpty()){
        return;
    }
    
    job = JobModel.getJobCollection().fetchJob();
    if(job){
        
        executeJob(job,executeCallback);
        if(job.schedule !== 'single'){
            job.nextExection = calcNextExectionTIme(job);
            JobModel.getJobCollection().insertJob(job);
        }
    }
}

const executeCallback = (job)=>{
    let log = `job ${job.id} is going to be executed`;
    JobModel.getJobCollection().addLog(log);}

const executeJob = (job,callback) =>{
    const sendOptions = {
        url: 'http://localhost:9000/jobs/executeJob',
        method: 'POST',
        body: {
            job
        }
      };
      let statusCode;
      commonFunctions.requestSimple(sendOptions).then((res)=>{
        let log = `response arrived for ${job.id}'`;
        JobModel.getJobCollection().addLog(log);
      });
        
      callback(job);
    
}

const calcNextExectionTIme = (job)=>{
    const nextSchedulingTime = parseInt(job.schedule);
    const milliToNextScheduling = 1000*nextSchedulingTime;
    return Date.now() + milliToNextScheduling;
}

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleep(fn, ...args) {
    await timeout(5000);
    return fn(...args);
}

module.exports = {
    loop
}