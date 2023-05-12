import { PrismaClient } from "@prisma/client"
import logger from "../../../utils/logger.utils.js"
const prisma = new PrismaClient()

export const insertCategory = async (req, res) => {
    try {
        const { category_name } = req.body
        const categoryName = category_name.toLowerCase()
        logger.info("Category: " + categoryName)
        const result = await prisma.category.create({
            data: {
                categoryName
            }
        })
        logger.info("Logging Category: " + result)
        return res.status(200).json({
            result
        })
    } catch (error) {
        logger.error(`${error.name}: ${error.message}`)
        return res.status(400).json({
            error: "Bad Request",
            statusCode: res.statusCode
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { category_name } = req.body
        const categoryName = category_name.toLowerCase()
        const categoryId = parseInt(id)

        logger.info("Category Name: " + categoryName + "; Id: " + id)

        const result = await prisma.category.update({
            where: {
                id: categoryId
            },
            data: {
                categoryName
            }
        })
        logger.info("Category Updated: " + result)
        return res.status(200).json(result)
    } catch (error) {
        logger.error(`${error.name}: ${error.message}`)
        return res.status(400).json({
            error: "Bad Request",
            statusCode: res.statusCode
        })
    }
}

export const getCategories = async (req, res) => {
    try {
        const result = await prisma.careers.findMany()

        return res.status(200).json(result)
    } catch (error) {
        logger.error(`${error.name}: ${error.message}`)
        return res.status(400).json({
            error: "Bad Request",
            statusCode: res.statusCode
        })
    }
}

export const deleteCategoryById = async (req, res) => {
    try {
        const { id } = req.params
        const categoryId = parseInt(id)
        
        const result = await prisma.category.delete({
            where: {
                id: categoryId
            }
        })
        logger.info("Deleted Category: " + result)

        return res.status(200).json(result)
    } catch (error) {
        logger.error(`${error.name}: ${error.message}`)
        return res.status(400).json({
            message: "Bad Request",
        })
    }
}