import winston, {
  format,
} from 'winston';
import path from 'path';

const {
  combine,
  timestamp,
  label,
  prettyPrint,
} = format;

const config = winston.createLogger({
  format: combine(
    label({
      label: 'Population',
    }),
    timestamp(),
    prettyPrint(),
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/error.logs'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/combined.logs'),
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

const logger = (level, message) => {
  config.log({
    level,
    message,
  });
  return {
    isLogged: true,
    message,
    level,
  };
};

export default logger;
