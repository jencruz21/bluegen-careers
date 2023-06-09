import express from "express"
import * as CareersController from "../controllers/careers/admin/careers.admin.controller.js"
import * as CategoryController from "../controllers/careers/admin/category.admin.controller.js"

// This will be changed in the forseeable future
const router = express.Router()

router.get("/", CareersController.dashBoard)
router.get("/careers", CareersController.getAllCareers)

//
router.get("/create-career", CareersController.createCareer)
router.post("/insert-career", CareersController.insertCareer)
router.post("/update-career/:id", CareersController.updateCareerById)
router.get("/delete-career/:id", CareersController.deleteCareerById)
router.get("/edit-career/:id", CareersController.editCareerById)
router.get("/get-career/:id", CareersController.getCareerById)

// Category
router.post("/insert-category", CategoryController.insertCategory)
router.post("/update-category/:id", CategoryController.updateCategory)
router.get("/categories", CategoryController.getCategories)
router.get("/delete-category/:id", CategoryController.deleteCategoryById)

// messages
router.get("/messages", CareersController.getMessages)
export default router