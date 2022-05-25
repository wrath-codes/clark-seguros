//* -----------------------------------------------------------------------
//*  Server -->
// @libraries
import express from 'express'
import { config } from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import fileupload from 'express-fileupload'
import path from 'path'
import cookieParser from 'cookie-parser'

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

// @routes
app.use('/api/auth', authRoutes) // add auth routes
app.use('/api/contacts', contactRoutes) // add contact routes
app.use('/api/operators', operatorRoutes) // add operator routes
app.use('/api/plans', planRoutes) // add plan routes
app.use('/api/employers', employerRoutes) // add employer routes
app.use('/api/contracts', contractRoutes) // add contract routes
app.use('/api/employees', employeeRoutes) // add employee routes
app.use('/api/plan-cards', planCardRoutes) // add planCard routes
app.use('/api/users', userRoutes) // add admin user routes

// @error handling
app.use(notFound)
app.use(errorHandler)

// @server listen
app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`.yellow.bold)
)
