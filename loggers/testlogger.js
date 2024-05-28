const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${level}: ${timestamp} ${message}`;
  });

const testlogger = () => {
    return createLogger({
        format: combine(
            format.colorize(),
            timestamp(),
            myFormat
        ),
        transports: [new transports.Console()]
    })

}

module.exports = testlogger