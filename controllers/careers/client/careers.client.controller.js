import { PrismaClient } from "@prisma/client"
import logger from "../../../utils/logger.utils.js"
const prisma = new PrismaClient()

export const getCareerById = async (req, res) => {
    try {
        const { id } = req.params

        const result = await prisma.careers.findFirst({
            where: {
                id: parseInt(id)
            },
            include: {
                careerCategory: true
            }
        })
        logger.info("Career Successfully Fetched")
        return res.status(200).render("client/career", {
            career: result
        })
    } catch (error) {
        logger.error(`${error.name}: ${error.message}`)
        return res.status(400).json({
            message: "Bad Request"
        })
    }
}

export const getAllCareers = async (req, res) => {
    try {
        const result = await prisma.careers.findMany({
            include: {
                careerCategory: true
            }
        })
        logger.info("All Careers Successfully Fetched")
        return res.status(200).render("client/careers", {
            careers: result
        })  
    } catch (error) {
        logger.error(`${error.name}: ${error.message}`)
        return res.status(400).json({
            message: "Bad Request"
        })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {
            subject,
            message,
            sender,
            senderEmail,
            senderContactDetails,
            careerId,
        } = req.body

        const result = await prisma.messages.create({
            data: {
                subject,
                message,
                sender,
                senderEmail,
                senderContactDetails,
                careerId
            }
        })
        console.log(result)
        logger.info("Message Sent Successfully")
        return res.status(200).redirect('/careers')
    } catch (error) {
        logger.error(`${error.name}: ${error.message}`)
        return res.status(400).json({
            message: "Bad Request" 
        })
    }
}
    
