const jobModel = require('../jobManagment/model');
module.exports = {
    createJob: (req,res,next) => {
        try{
            let {job} = req.body;
            console.log('1');
            let model = jobModel.getJobCollection();
            console.log('2');
            job.nextExection = Date.now();
            model.insertJob(model.calcJobId(job));
            res.status(200).send(`Job ${job.id} has been insert to job system.`);
            return;
        }catch(e){
            res.status(400).send(`failed to insert job`);
        }

        
    },

    getLogs: (req,res,next) => {
        try{
            let model = jobModel.getJobCollection();
            let result = model.getJobLogs();
            res.status(200).send(result);
        }catch(e){
            res.status(400).send(`failed to get Logs `);
        }
    },
    clearJobs: (req,res,next) => {
        try{
            let model = jobModel.getJobCollection();
            model.clear();
            res.status(200).send({
                message : 'Jobs have been cleared'
            });
        }catch(e){
            res.status(400).send(`failed to clear jobs `);
        }
    },
}