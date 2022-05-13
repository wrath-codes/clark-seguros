//* -----------------------------------------------------------------------
//*  Server -->
// @libraries
import express from 'express'
import { config } from 'dotenv'
import colors from 'colors'
// @db
import connectDB from './config/db.js'
// @middleware
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
// @routes
import contactRoutes from './routes/contactRoutes.js'
import operatorRoutes from './routes/operatorRoutes.js'
import planRoutes from './routes/planRoutes.js'

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

// @routes
app.use('/api/contacts', contactRoutes) // add contact routes
app.use('/api/operators', operatorRoutes) // add operator routes
app.use('/api/plans', planRoutes) // add plan routes

// @error handling
app.use(notFound)
app.use(errorHandler)

// @server listen
app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`.yellow
			.bold
	)
)
