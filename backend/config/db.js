//* database config
//* -----------------------------------
// @imports
import mongoose from 'mongoose'

// connect to database
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI)
		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
	} catch (error) {
		console.log(`Error: ${error.message}`.red.underline)
		process.exit(1)
	}
}

export default connectDB
