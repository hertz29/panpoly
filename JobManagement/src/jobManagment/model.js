const _ = require('lodash');

let instance = null;

const getJobCollection = () =>{
        if(instance === null){
            console.log('creating new JobsCollection');
            instance = new JobsCollection()
        }
        return instance;
}

class JobsCollection{
    constructor(){
        this.job_list = [];
        this.jobCounter = 0;
        this.jobLogs = []; 
        instance = this;
    }

    calcJobId(job){
        if(!job.id){
            job.id = this.jobCounter;
            this.jobCounter++;
        }
        return job;
    }

    insertJob(job){
        job.status = 'waiting';
        const log = `${job.id} is inserted, status is ${job.status} next execution is: ${job.nextExection}`
        this.addLog(log);
        this.job_list.length === 0 ?
        this.job_list.push(job)
        : this.insertJobByExecutionTime(job)
    }

    insertJobByExecutionTime(job){
        const inserted_job_next_exection = job.nextExection;
        let new_job_list = [];
        let isNewJobHasBeenInserted = false;
        console.log(this.job_list.length);
        _.forEach(this.job_list, (submittedJob) => {
            if(isNewJobHasBeenInserted || (!isNewJobHasBeenInserted && (submittedJob.nextExection <= inserted_job_next_exection))){
                new_job_list.push(submittedJob);
            }
            new_job_list.push(job);
            new_job_list.push(submittedJob);
            isNewJobHasBeenInserted = true; 
        });
        console.log(new_job_list);
        this.job_list = new_job_list;
    }

    fetchJob(){
        //--this.jobCounter;
        const condition = this.isJobShouldBeScheduled();
        if(condition){
            let  job = this.job_list.pop();
            return job;
        }
        return null;
    }

    isJobShouldBeScheduled(){
        if(!this.isEmpty()){
            let next_exection_time = this.job_list[0].nextExection;
            const timestemp = Date.now();
            if(next_exection_time <= timestemp){
                return true;
            }
        }
        return false;
    }

    isEmpty(){
        return this.job_list.length === 0;
    }

    getJobLogs(){
        return this.jobLogs;
    }
    clear(){
        this.job_list = [];
        let log = `jobs have been cleared`;
        this.addLog(log);
    }

    addLog(string){
        console.log(string);
        this.jobLogs.push(string);
    }
}


module.exports = {
    JobsCollection,
    getJobCollection,
}