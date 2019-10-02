class JobEcexutor{
    constructor(id){
        this.id = id;
        this.free = true;

    }

    executeJob(job,instance,callback){
        this.free = false;
        console.log(`executor execute job ${job.id}`);
        const executionTime = job.executionTime;
        console.log(`executionTime  is : ${executionTime}`);
        job.status = 'executing';

        setTimeout(() => {
            console.log(`executor ${this.id} finish to execute job`);
            callback(this,job,instance);
        }, executionTime);
    }
}
module.exports = JobEcexutor;