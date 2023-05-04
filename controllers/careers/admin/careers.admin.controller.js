import { PrismaClient } from "@prisma/client"
import logger from "../../../utils/logger.utils.js"

export const getAllCareers = async (req, res) => {
    try {
        
    } catch (error) {
        logger.error(`name: ${error.name};message: ${error.message}`)
        return res.status(400).json({
            error: error.message
        })
    }
}