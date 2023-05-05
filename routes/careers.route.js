import express from "express"
import logger from "../utils/logger.utils.js"
import * as CareersController from "../controllers/careers/admin/careers.admin.controller.js"
import * as CategoryController from "../controllers/careers/admin/category.admin.controller.js"

const router = express.Router()

router.get("/", CareersController.getAllCareers)

router.post("/insert-career", CareersController.insertCareer)

// Career Category
router.post("/insert-category", CategoryController.insertCategory)
router.post("/update-category/:id", CategoryController.updateCategory)

export default router