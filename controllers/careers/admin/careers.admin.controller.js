import { PrismaClient } from "@prisma/client"
import logger from "../../../utils/logger.utils.js"
const prisma = new PrismaClient()

export const getAllCareers = async (req, res) => {
    try {
        logger.info(`URL Loaded: ${req.url}`)
        const careers = await prisma.careers.findMany({
            include: {
                careerCategory: true
            }
        })
        logger.info("Careers loaded successfully")
        return res.status(200).render("admin/careers", {
            careers: careers
        })
    } catch (error) {
        logger.error(`${error.name}: ${error.message}`)
        return res.status(400).json({
            error: error.message
        })
    }
}

export const getCareerById = async (req, res) => {
    try {
        const { id } = req.params
        const career = await prisma.careers.findFirst({
            where: {
                id: parseInt(id)
            }
        })
        logger.info("Career loaded successfully")
        return res.status(200).render("admin/career", {
            career: career
        })
    } catch (error) {
        logger.error(`${error.name}: ${error.message}`)
        return res.status(400).json({   
            message: "Bad Request"                                      
        })
    }       
}    


/**
 * subject to remove for api architecture
 */
export const createCareer = async (req, res) => {
    try {
        const categories = await fetchCategories()
        logger.info("Rendering Create Career")
        return res.status(200).render("admin/create-career", {
            categories
        })
    } catch (error) {
        return res.status(400).json({
            message: "Bad Request"
        })
    }
}

/**
 * insert career action
 */

export const insertCareer = async (req, res) => {
    try {
        const {
            career_name,
            career_category,
            career_description,
            hr_email,
            hr_name,
            office_name,
            office_address
        } = req.body

        const careerCategoryId = parseInt(career_category)

        const result = await prisma.careers.create({
            data: {
                careerName: career_name,
                categoryId: careerCategoryId,
                careerDescription: career_description,
                hrName: hr_name,
                hrEmail: hr_email,
                officeAddress: office_address,
                officeName: office_name
            }
        })
        logger.info("Result Inserted: " + result)
        return res.status(200).redirect("/careers/admin")
    } catch (error) {
        logger.error(`${error.name}: ${error.message}`)
        return res.status
    }
}

/**
 * Retrieve edit career page
 */

export const editCareerById = async (req, res) => {
    try {
        const { id } = req.params 
        const career = await prisma.careers.findFirst({
            where: {
                id: parseInt(id)
            }
        })
        logger.info({
            career
        })
        logger.info("Career loaded successfully")
        return res.status(200).render("admin/edit-career", {
            career,
            categories: await fetchCategories()
        })
    } catch (error) {
        logger.error(`${error.name}: ${error.message}`)

        return res.status(400).json({ 
            message: "Bad Request"
        })
    }
}

/**
 * Update career by id action
 */

export const updateCareerById = async (req, res) => {
    try {
        const { career_name, career_category, career_description, office_name } = req.body
        const { id } = req.params 
        const result = await prisma.careers.update({
            where: {
                id: parseInt(id)
            },
            data: {
                careerName: career_name,
                categoryId: parseInt(career_category),
                careerDescription: career_description,
                officeName: office_name
            }
        })
        return res.status(200).redirect("/careers/admin")
    } 
     catch (error) {
        logger.error(`${error.name}: ${error.message}`)
        return res.status(400).json({
            message: "Bad Request"
        })
    }
}
/**
 * Delete career by id
 */

export const deleteCareerById = async (req, res) => {
    try {
        const { id } = req.params

        const result = await prisma.careers.delete({
            where: {
                id: parseInt(id)
            }
        })

        logger.info("Career Deleted: " + result)
        return res.status(200).redirect("/careers/admin")
    
    } catch (error) {
        logger.error(`${error.name}: ${error.message}`)
        
        return res.status(400).json({
            message: "Bad Request"
        })
    }
}

/**
 * This function will be removed due to api reasons
 */

export const fetchCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany()
        logger.info("Categories loaded successfully")
        return categories
    } catch (error) {
        logger.error(`${error.name}: ${error.message}`)
        return
    }
}

/**
 * End
 */

export const dashBoard = async (req, res) => {
    return res.status(200).render("admin/dashboard")
}


export const getMessages = async (req, res) => {
    try {
        const result = await prisma.messages.findMany()

        return res.status(200).render('admin/messages', {
            messages: result
        })
    } catch (error) {
        logger.error(`${error.name}: ${error.message}`)
        return res.status(400).json({
            message: "Bad Request",
        })
    }
}
