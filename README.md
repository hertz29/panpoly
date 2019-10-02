# Panoply Job System Assignment

In the repo you can find:
1. React app
2. Job Management app
3. Scheduler app

React app - a simple web page that contains an execute job form and get jobs' logs buttom.

Job Management - Service that handle the jobs management.
  
  Job Model:
    Include a List of jobs.
    The model insert a job into the list by inserting according to the job's next execution time.
    
   Job Fetcher:
    Includes a loop that fetching job that need to be executed and send the job to be executed in the Scheduler.
    Job Fetcher starts his loop in the service initation. 
  
  End-Points:
    1. createJob : A job is received from the React app. The job is inserted into the JobModel job_list.
    2. getLogs: return all jobs' important logs.
    3. clearJobs: clear all jobs.
    
Scheduler - Service that execute the jobs.
 
 The scheduler has set of JobExecutors and a Pendding Job queue.
  
 When an executeJob event is received, the Scheduler perform a validation By job id and job type. If the job is valid, the Scheduler pick an executor and execute the job. After the executor finish his work, he taking another job from the pendding queue.

## Installation

You can install the app by 
```bash
npm install_panoply_app
```
## Runnig The Job System App

you can run the app with docker's images

MacOs
```bash
npm start
```

Linux
```bash
npm start-linux
```



## Job Logs:
  you can get logs by press the relevant button.
  
  In the Scheduler logs you can see all relevant info
