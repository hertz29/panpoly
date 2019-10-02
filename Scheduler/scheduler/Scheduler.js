const JobExecutor = require('./JobExecutor');


let instance  = null;

const getScheduler = (limit)=>{
    if(instance === null){
        console.log(`init Scheduler - limit ${limit}`);
        instance = new Scheduler(limit);
    }
    return instance;
}


class Scheduler{
    constructor(limit){
        this.pendding_queue = [];
        this.jobStates = {};
        this.jobTypes = {};
        this.job_executors = [];
        for(let i = 1; i <= limit ; i++){
            console.log(`creating executor ${i}`);
            this.job_executors.push(new JobExecutor(i));
        }
    }
    handleJob(job,res,callback){
        this.receiveJob(job);
        this.executeJob(job,() => {
            console.log(`job ${job.id} is executing`);
        });    
        callback(res,job);
    }


    addPenddingJob(job){
        this.pendding_queue.push(job);
    }

    receiveJob(job){
        job.state = 'pre-executing';    
        this.jobStates[job.id] = job.state;
        this.jobTypes[job.type] = true;
    }

    releaseJob(job){
        console.log(`release job ${job.id}`);
        job.state = 'executed';    
        this.jobStates[job.id] = job.state;
        this.jobTypes[job.type] = false;
        if(job.cleanUp !== 'none'){
            console.log(`performning clean up for ${job.id}`);
        }
    }

    isValidateByTypeAndId(job){
        if(this.jobStates[job.id] != 'executed' && this.jobStates[job.id] != null){
            console.log('job is allready assigned to scheduler');
            job.state = 'failed';
            return false;
        }
        if(this.jobTypes[job.type]){
            console.log('job type is allready assigned to scheduler');
            job.state = 'failed';
            return false;
        }
        return true;
    }

    executeJob(job,callback){
        console.log(`Scheduler - in execute job`);
        if(this.job_executors[0].free){
            console.log(`Scheduler - executor if free`);
            let executor = this.job_executors.pop();
            executor.free = false;
            executor.executeJob(job,this,this.executionCallback);
            callback(executor.id,job);
            return;
        }
        this.addPenddingJob(job); 
    }

    executionCallback(executor,job,scheduler){
        console.log(`executing callback ${scheduler.pendding_queue.length >0}`)
        scheduler.releaseJob(job);
        if(scheduler.pendding_queue.length >0){
            const penddingJob = scheduler.pendding_queue.pop();
            executor.executeJob(penddingJob,scheduler,(executor,job,pendding_queue)=>{
                scheduler.job_executors.push(executor);
                executor.free = true;
            })
        }
        scheduler.job_executors.push(executor);
        return executor.free = true;
    }



    getJobs(){
        return this.jobStates;
    }

}

module.exports ={
    Scheduler,
    getScheduler,
} 