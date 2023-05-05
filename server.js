/**
 * Package Imports *STRICT*
 */
import express from "express"
import dotenv from "dotenv"
import logger from "./utils/logger.utils.js"
// import path from "path"

/**
 * Route Imports
 */
import CareersRoute from "./routes/careers.route.js"

/**
 * Package Initialization
 */
const app = express()
dotenv.config({
    path: "./.env",
    debug: true,
})
/**
 * Views Configuration
 */
app.set("view engine", "ejs")
app.set("views", "./public/views") // by default views are set on the root view folder eg (./views); I inserted this inside the public folder to also add other files eg css, js, etc.
/**
 * Middleware initialization
 */
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

/**
 * Route initialization
 */
app.use("/careers/admin", CareersRoute)


app.listen(process.env.PORT, () => {
    logger.info(`Listening to ${process.env.HOST}:${process.env.PORT}`)
})

