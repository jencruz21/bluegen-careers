import winston from "winston"

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${level.toUpperCase()}:${timestamp} - ${message}`;
})

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ 
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        myFormat
    ),
    transports: [
        new winston.transports.Console({
            json: false
        }),
        new winston.transports.File({
            filename: "./logs/app.info.log",
            level: "info",
            json: false
        }),
        new winston.transports.File({
            filename: "./logs/app.error.log",
            level: "error",
            json: false
        })
    ]
})

export default logger