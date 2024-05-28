const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const path = require('path');
const fs = require('fs');

const myFormat = printf(({ level, message, timestamp }) => {
    return `${level}: ${timestamp} ${message}`;
  });


  const logDir = path.join(__dirname, '../logs');
  if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
  }

const productionlogger = () => {
    return createLogger({
        format: combine(
            timestamp(),
            myFormat
        ),
        transports: [
            new transports.File({ filename: path.join(logDir,'combined.log'), level:'info' }),
            new transports.Console()
        ],
    })

}

module.exports = productionlogger