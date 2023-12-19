import winston from 'winston';

// const logger = winston.createLogger({
//     transports: [
        
//         new winston.transports.Console({ level: "http" }),
//         new winston.transports.File({ filename:'./errors.log',level: 'warn' }),
//         new winston.transports.File({filename: 'combined.log'})

//     ]
// })


const logLevels = {
    debug: 0,
    http: 1,
    info: 2,
    warn: 3,
    error: 4,
    fatal: 5
    };

const devLogger = winston.createLogger({
    levels: logLevels,
    format: winston.format.simple(),
    transports: [
    new winston.transports.Console({ level: 'debug' })
    ]
});

const prodLogger = winston.createLogger({
    levels: logLevels,
    format: winston.format.simple(),
    transports: [
    new winston.transports.File({ filename: 'errors.log', level: 'error' })
    ]
});

export { devLogger, prodLogger };