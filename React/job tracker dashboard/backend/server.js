const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const logger = require('./src/utils/logger');
const errorHandler = require('./src/middlewares/errorHandler');

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/applications', require('./src/routes/Application'));
app.use('/api/profiles', require('./src/routes/Profile'));
app.use('/api/reminders', require('./src/routes/Reminder'));

// Log startup
logger.info('API starting...');

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));