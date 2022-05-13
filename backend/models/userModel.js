//* -----------------------------------------------------------------------
//*  User Model -->

// @imports
import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
	{
		name: {
			firstName: {
				type: String,
				required: true
			},
			lastName: {
				type: String,
				required: true
			}
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		cellphone: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false
		},
		isStaff: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	{
		timestamps: true
	}
)

const User = mongoose.model('User', userSchema)

export default User
