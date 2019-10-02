const should = require('should');
const controller = require('../../conrollers/JobController');


describe('Test simple job  that has been received without scheduling ' , ()=> {
    it('Should execute job',()=>{
        const job = {
            id : 1,
            type : "A",
            status : "after",
            period : "2",
            executionTime : "30"
        }
        controller.executeJob(job);
    });
});

describe('Test simple job  that has been received with scheduling ' , ()=> {
    it('Should execute job',()=>{

    });
});