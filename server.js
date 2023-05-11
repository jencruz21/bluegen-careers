/**
 * Package Imports *STRICT*
 */
import express from "express"
import dotenv from "dotenv"
import logger from "./utils/logger.utils.js"
import path from "path"
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Route Imports
 */
import CareersAdminRoute from "./routes/careers.admin.route.js"
import CareersClientRoute from "./routes/careers.client.route.js"

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
app.use("/js", express.static(path.resolve(__dirname, "public/js")))
app.use("/css", express.static(path.resolve(__dirname, "public/css")))

/**
 * Route initialization
 */
app.use("/careers", CareersClientRoute)
app.use("/careers/admin", CareersAdminRoute)


app.listen(process.env.PORT, () => {
    logger.info(`Listening to ${process.env.HOST}:${process.env.PORT}`)
})

