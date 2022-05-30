//* -----------------------------------------------------------------------
//*  Server -->
// @libraries
import express from 'express'
import { config } from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import fileupload from 'express-fileupload'
import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
// @ts-ignore
import xss from 'xss-clean'
import rateLimit from 'express-rate-limit'
import hpp from 'hpp'
import cors from 'cors'

// @path fix
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// @db
import connectDB from './config/db.js'
// @middleware
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
// @routes
import contactRoutes from './routes/contactRoutes.js'
import operatorRoutes from './routes/operatorRoutes.js'
import planRoutes from './routes/planRoutes.js'
import employerRoutes from './routes/employerRoutes.js'
import contractRoutes from './routes/contractRoutes.js'
import employeeRoutes from './routes/employeeRoutes.js'
import planCardRoutes from './routes/planCardRoutes.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'

const PORT = process.env.PORT || 5000

// @initalize
config()
const app = express()

// @connect db
connectDB()

// body-parser setup
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// idententation setup
app.set('json spaces', 2)

// cookie parser
app.use(cookieParser())

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// file uploading
app.use(fileupload())
// sanitize mongo data / prevent sql injections
app.use(mongoSanitize())
// set security headers
app.use(helmet())
// prevent xss attacks
app.use(xss())
// rate limiting
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 min
	max: 500 // 500 requests
})
app.use(limiter)
// prevent http param pollution
app.use(hpp())
// enable CORS
app.use(cors())

// @routes
app.use(express.static(__dirname + '/public'))
app.use('/api/v1/auth', authRoutes) // add auth routes
app.use('/api/v1/contacts', contactRoutes) // add contact routes
app.use('/api/v1/operators', operatorRoutes) // add operator routes
app.use('/api/v1/plans', planRoutes) // add plan routes
app.use('/api/v1/employers', employerRoutes) // add employer routes
app.use('/api/v1/contracts', contractRoutes) // add contract routes
app.use('/api/v1/employees', employeeRoutes) // add employee routes
app.use('/api/v1/plan-cards', planCardRoutes) // add planCard routes
app.use('/api/v1/users', userRoutes) // add admin user routes

// @error handling
app.use(notFound)
app.use(errorHandler)

// @server listen
app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`.yellow.bold)
)
