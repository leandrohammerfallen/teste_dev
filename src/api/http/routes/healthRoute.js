require('dotenv/config');

const { Router } = require('express');
const healthRouter = Router();

const moment = require('moment');

const startAPI = moment();

// GET - Health Check by API
healthRouter.get('/', (req, res) => {
    // format Uptime
    let diffDuration = moment.duration(moment().diff(startAPI));
    let hours = [
        diffDuration.hours(),
        diffDuration.minutes(),
        diffDuration.seconds()
    ].join(":").replace(/\b(\d)\b/g, '0$1');
    let strUptime = diffDuration.days() + ' day(s), ' + hours;

    return res.status(200).send({
        Hostname: process.env.HOSTNAME,
        IP: process.env.SVC_IP,
        Service: process.env.SVC_NAME,
        Scope: process.env.SVC_PATH_PREFIX_LOCAL,
        Version: process.env.API_VERSION,
        Status: "running",
        Started: startAPI.format('DD/MM/yyyy HH:mm:ss'),
        Uptime: strUptime,
    });
});

// export all routes from 'healthRoute'
module.exports = {
    healthRouter,
};
