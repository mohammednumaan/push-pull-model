const express = require("express");
const app = express();
const jobs = {};

/* 
    this file implementes LONG POLLING. SHORT POLLING
    is very similar to this, where the client frequently 
    sends request to the `/check-job` endpoint. 
*/

const updateJob = (jobId, progress) => {
    jobs[jobId] = progress;
    console.log(`Updated ${jobId} to ${progress}!`);

    if (progress === 100) return;
    setTimeout(() => updateJob(jobId, progress + 10), 3000);
}

const checkJobCompletion = async (jobId) => {
    return new Promise((res, rej) => {
        if (jobs[jobId] < 100) setTimeout(() => res(false), 1000);
        else res(true);
    })
}

app.post('/submit-job', (req, res, next) => {
    const jobId = `job:${Date.now()}`;
    jobs[jobId] = 0;

    updateJob(jobId, 0);
    res.end("\n\n" + jobId + "\n\n")
})

app.get('/check-job', async (req, res, next) => {
    const { jobId } = req.query; 
    while (!await checkJobCompletion(jobId));
    res.end("\n\nJob Status Complete:" + jobs[jobId] + "\n\n")
})

app.listen('3000', () => {
    console.log("Server Listening at Port 3000.")
})

