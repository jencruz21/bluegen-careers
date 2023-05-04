import winston from "winston"
import path from "path"

const logger = winston.createLogger({
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