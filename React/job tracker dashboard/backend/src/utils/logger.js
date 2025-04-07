const { createLogger, format, transports, addColors } = require('winston');

const customLevels = {
    levels: {
        cron: 0,
        auth: 1,
        db: 2,
        api: 3,
        error: 4,
        warn: 5,
        info: 6,
        debug: 7,
    },
    colors: {
        cron: 'yellow',
        auth: 'magenta',
        db: 'cyan',
        api: 'blue',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'grey',
    },
};

addColors(customLevels.colors);

const isDev = process.env.NODE_ENV !== 'production';

const logger = createLogger({
    levels: customLevels.levels,
    level: isDev ? 'debug' : 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize({ all: true }),
        format.printf(({ level, message, timestamp }) => `[${timestamp}] [${level}]: ${message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
    ],
});

module.exports = logger;
