//* -----------------------------------------------------------------------
//*  User Model -->

// @imports
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema(
	{
		name: {
			firstName: {
				type: String,
				required: [true, 'Please add a first name']
			},
			lastName: {
				type: String,
				required: [true, 'Please add a last name']
			}
		},
		email: {
			type: String,
			required: [true, 'Please add an email'],
			unique: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please add a valid email!'
			]
		},
		cellphone: {
			type: String,
			required: [true, 'Please add an cellphone'],
			match: [
				/^\([1-9]{2}\)[9]{0,1}[6-9]{1}[0-9]{3}\-[0-9]{4}$/,
				'Please add an valid cellphone number'
			]
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
			minlength: 6,
			select: false
		},
		role: {
			type: String,
			enum: [
				'admin',
				'staff-auto',
				'staff-health',
				'staff-others',
				'staff-all',
				'client'
			],
			default: 'staff-health'
		},
		resetPasswordToken: { type: String },
		resetPasswordExpire: { type: Date }
	},
	{
		timestamps: true
	}
)

// encrypt password using bcrypt
userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

// compares passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

// sign jwt and return
userSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE
	})
}

const User = mongoose.model('User', userSchema)

export default User
