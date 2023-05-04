import express from "express"
import logger from "../utils/logger.utils.js"
const router = express.Router()

router.get("", (req, res) => {
    logger.info("Hello World")
    return res.status(200).render("careers/client/index")
})

router.post("/search", (req, res) => {
    const query = req.body.q

    return res.status(200).json({
        query
    })
})

export default router