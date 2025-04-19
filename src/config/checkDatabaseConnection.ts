import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const MAX_RETRIES = 3 // Maksimal percobaan
const RETRY_DELAY_MS = 3000 // Jeda 3 detik antar percobaan

export const checkDatabaseConnection = async () => {
  let attempts = 0

  while (attempts < MAX_RETRIES) {
    try {
      console.log(`🔍 Attempting to connect to database (Attempt ${attempts + 1}/${MAX_RETRIES})...`)
      await prisma.$connect()
      console.log('✅ Successfully connected to the database via Prisma.')
      return // Langsung return kalau berhasil
    } catch (error) {
      attempts++
      console.error(`❌ Failed to connect to database (Attempt ${attempts}/${MAX_RETRIES})`)
      console.error(error)

      if (attempts >= MAX_RETRIES) {
        console.error('❌ Max retries reached. Exiting application.')
        process.exit(1)
      }

      console.log(`⏳ Retrying in ${RETRY_DELAY_MS / 1000} seconds...`)
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS))
    }
  }
}
