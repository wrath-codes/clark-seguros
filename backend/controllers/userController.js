//* Employer Controller
//* -------------------------------------------------------------
// imports
// @libraries
import asyncHandler from 'express-async-handler'
// @models
import User from '../models/userModel.js'

//* @controller
//* -------------------------------------------------------------

// @desc    Auth User & Get Token
// @route   GET - /api/users/login
// @access  Public
// --------------------------------------------------------------

const authUser = asyncHandler(async (req, res) => {
	// destructure user data
	const { email, password } = req.body

	// find user by email
	const user = await User.findOne({ email })

	// checks if user exists
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			isStaff: user.isStaff,
			token: null
		})
	} else {
		res.status(401)
		throw new Error('Invalid email and/or password!')
	}
})

//* -------------------------------------------------------------
export { authUser }
