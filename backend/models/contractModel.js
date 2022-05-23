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
		isValid: {
			type: Boolean,
			required: true,
			default: true
		},
		contractFile: {
			type: String,
			default: 'no-photo.jpg'
		}
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	},
	{
		timestamps: true
	}
)

// add employees field
contractSchema.virtual('employees', {
	ref: 'PlanCard',
	localField: '_id',
	foreignField: 'contract',
	justOne: false,
	populated: true
})

const Contract = mongoose.model('Contract', contractSchema)

export default Contract
