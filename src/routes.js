const { Router } = require('express');
const routes = Router();

// -------------------
// HEALTH CHECK ROUTES
// -------------------
const { healthRouter } = require('./api/http/routes/healthRoute');  // Health Check

// Publish all endpoints UNPROTECTEDS!
routes.use('/api', healthRouter);

// Export all endpoints availables
module.exports = routes;
