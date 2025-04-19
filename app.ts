import dotenv from 'dotenv'
dotenv.config()

import express, { type Express } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from 'http'

import { CONFIG } from './src/config'
import { appRouter } from './src/routes/api.route'
import { init } from './src/config/socket'
import parsingArgs from './src/utils/parseArgs'
import { ResponseMiddleware } from './src/middlewares/responseMiddleware'
import { errorMiddleware, notFoundMiddleware } from './src/middlewares/globalErrMiddleware'
import { checkDatabaseConnection } from './src/config/checkDatabaseConnection'

process.env.TZ = 'Asia/Jakarta'

const argsObj = parsingArgs(['--port'])

if (argsObj.port) {
  if (isNaN(Number(argsObj.port))) {
    console.error('Port must be a number')
    process.exit(1)
  }
  if (Number(argsObj.port) < 0 || Number(argsObj.port) > 65535) {
    console.error('Port must be between 0 and 65535')
    process.exit(1)
  }
  CONFIG.port = Number(argsObj.port)
}

const app: Express = express()
const server = http.createServer(app)
const io = init(server)

// Middleware
app.use(cors({ origin: true, credentials: true }))
app.use(express.json()) // Express sudah built-in body-parser json
app.use(cookieParser())
app.use('/public', express.static('public'))
app.use(ResponseMiddleware)

// Routing
appRouter(app)

// Error handling
app.all('*', notFoundMiddleware)
app.use(errorMiddleware)

// Socket.IO
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

// MAIN RUN FUNCTION
const main = async () => {
  await checkDatabaseConnection() // pastikan DB connect dulu

  server.listen(CONFIG.port, () => {
    console.log(`🚀 Server running on port ${CONFIG.port}`)
  })
}

// Jalankan
main()
