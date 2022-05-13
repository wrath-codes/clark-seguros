//* -----------------------------------------------------------------------
//*  Employer Model -->

// @imports
import mongoose from 'mongoose'

const employmentSchema = mongoose.Schema(
	{
		employer: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Employer'
		},
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Employee'
		},
		startDate: {
			type: Date,
			required: true
		},
		exitDate: {
			type: Date,
			required: false
		},
		isCurrent: {
			type: Boolean,
			required: true,
			default: true
		}
	},
	{
		timestamps: true
	}
)

const Employment = mongoose.model('Employment', employmentSchema)

export default Employment
