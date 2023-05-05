import { PrismaClient } from "@prisma/client"
import logger from "../../../utils/logger.utils.js"
const prisma = new PrismaClient()

export const getAllCareers = async (req, res) => {
    try {
        logger.info(`URL Loaded: ${req.url}`)
        const careers = await prisma.careers.findMany()
        logger.info("Careers loaded successfully")
        return res.status(200).render("admin/index", {
            careers: careers
        })
    } catch (error) {
        logger.error(`${error.name}: ${error.message}`)
        return res.status(400).json({
            error: error.message
        })
    }
}

export const getCareer = async (req, res) => {

}

/**
 * subject to remove for api architecture
 */
export const createCareer = (req, res) => {
    logger.info("Rendering Create Career")
    return res.status(200).render("admin/create-career")
}

export const insertCareer = async (req, res) => {
    try {
        const {
            career_name,
            career_category,
            career_description,
            hr_email,
            hr_name,
            office_name,
            office_location
        } = req.body

        const result = await prisma.careers.create({
            data: {
                careerName: career_name,
                categoryId: career_category,
                careerDescripttion: career_description,
                hrName: hr_name,
                hrEmail: hr_email,
                officeLocation: office_location,
                officeName: office_name
            }
        })
        logger.info("Result Inserted: " + result)
        return res.status(200).redirect("/careers")
    } catch (error) {
        logger.error(`${error.name}: ${error.message}`)
        return res.status
    }
}