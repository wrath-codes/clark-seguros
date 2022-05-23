//* -----------------------------------------------------------------------
//*  planCard Model -->

// @imports
import mongoose from 'mongoose'

const planCardSchema = mongoose.Schema(
	{
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Employee'
		},
		identifier: {
			type: String,
			required: true,
			unique: true
		},
		plan: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Plan'
		},
		planValue: {
			type: String,
			required: true
		},
		planValueHistory: [
			{
				change: { type: Date, required: true },
				value: { type: String, required: true }
			}
		],
		planHistory: [
			{
				plan: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Plan'
				},
				isCurrent: { type: Boolean, required: true, default: true },
				change: { type: Date, required: true }
			}
		],
		kind: {
			type: String,
			required: true,
			enum: ['Titular', 'Conjuge', 'Filho/Filha', 'Mãe/Pai']
		},
		lives: {
			type: Number,
			required: true,
			default: 1
		},
		employer: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Employer'
		},
		employmentHistory: [
			{
				employer: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Employer'
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
			}
		],
		contract: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Contract'
		},
		contractHistory: [
			{
				contract: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Employer'
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
			}
		]
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	},
	{
		timestamps: true
	}
)

const PlanCard = mongoose.model('PlanCard', planCardSchema)

export default PlanCard
