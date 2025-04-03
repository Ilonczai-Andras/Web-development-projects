const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
    logger.error(`${err.message} ${err.stack}`);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
};
