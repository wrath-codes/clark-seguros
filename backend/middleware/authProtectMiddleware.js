//* Auth Controller
//* -------------------------------------------------------------
// imports
// @libraries
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
// @models
import User from '../models/userModel.js'

//* -------------------------------------------------------------

// protect routes
const protect = asyncHandler(async (req, res, next) => {
	let token

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]
	}
	// else if (req.cookies.token) {
	// 	token = req.cookies.token
	// }

	// make sure token exists
	if (!token) {
		res.status(401)
		throw new Error('Not Authorized to access this route!')
		next()
	}
	try {
		// verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		console.log(decoded)

		req.user = await User.findById(decoded.id)
		next()
	} catch (error) {
		res.status(401)
		throw new Error('Not Authorized to access this route!')
		next()
	}
})

//* -------------------------------------------------------------

// grant access to specific roles
const authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			res.status(403)
			throw new Error(
				`User role ${req.user.role} is NOT authorized to access this route!`
			)
			next()
		}
		next()
	}
}

//* -------------------------------------------------------------

export { protect, authorize }
