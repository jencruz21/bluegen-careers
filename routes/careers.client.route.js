import express from "express"
import * as CareersClientController from "../controllers/careers/client/careers.client.controller.js"
const router = express.Router()

router.get("/", CareersClientController.getAllCareers)
router.get("/career/:id", CareersClientController.getCareerById)

router.post("/message/:id", (req, res) => {
    return res.status(200).json({
        message: "Hello World"
    })
})
/**
 * Search Api
 */

/**
 * End
 */

/**
 * Filter Category
 */
export default router