const Scheduler = require('../scheduler/Scheduler');

const handleJobCallback = (res,job) => {
    res.status(200).send({ body : {
        job_id : job.id,
        job_status : "seccuss"
    }
        
    });
}

module.exports = {
    executeJob : (req, res, next) => {
        let {job} = req.body;
        console.log(`job: ${job.id}`);
        
        try{            
            let scheduler = Scheduler.getScheduler(3);
            let isValidateByTypeAndId = scheduler.isValidateByTypeAndId(job);
            
            if(!isValidateByTypeAndId){
                console.log(`job ${job.id} - is faild to be exectued`);
                res.status(400).send({
                    "job_id" : job.id,
                    "job_status" : "failed"
                });
    
            }else{
                Scheduler.getScheduler(3).handleJob(job,res,handleJobCallback);
                
            }
        }catch (e){
            res.status(400).send({
                "job_id" : job.id,
                "job_status" : "failed",
                "message" : e.toString()
            });
        }
    },

    getJobs : (req,res,next) => {
        try{
            let states = Scheduler.getScheduler(3).getJobStates();
            console.log(states);
            res.status(200).send(states);
        }catch(e){
            res.status(400).send({
                error : e.toString()
            });
    
        }
    }
}