//* -----------------------------------------------------------------------
//*  Contract Model -->

// @imports
import mongoose from 'mongoose'

const contractSchema = mongoose.Schema(
	{
		operator: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Operator'
		},
		employer: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Employer'
		},
		identifier: {
			type: String,
			required: true,
			unique: true
		},
		startDate: {
			type: Date,
			required: true
		},
		endDate: {
			type: Date,
			required: false
		},
		numEmployees: {
			type: Number,
			required: true,
			default: 0
		},
		isValid: {
			type: Boolean,
			required: true,
			default: true
		}
	},
	{
		timestamps: true
	}
)

const Contract = mongoose.model('Contract', contractSchema)

export default Contract
