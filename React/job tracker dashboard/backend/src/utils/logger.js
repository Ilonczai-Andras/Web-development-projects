const { createLogger, format, transports, addColors } = require('winston');

const customLevels = {
    levels: {
        auth: 0,
        db: 1,
        api: 2,
        error: 3,
        warn: 4,
        info: 5,
        debug: 6,
    },
    colors: {
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
