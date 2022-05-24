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
			type: Number,
			required: true
		},
		planValueHistory: [
			{
				change: { type: Date, required: true },
				value: { type: Number, required: true }
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
				startDate: {
					type: Date,
					required: true
				},
				exitDate: {
					type: Date,
					required: false
				}
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

// static method to get average plan costs for employer
planCardSchema.statics.getAverageCost = async function (employerId) {
	console.log('calculating average cost...'.blue)

	const obj = await this.aggregate([
		{
			$match: { employer: employerId }
		},
		{
			$group: {
				_id: '$employer',
				averageCost: { $avg: '$planValue' }
			}
		}
	])
	try {
		await this.model('Employer').findByIdAndUpdate(employerId, {
			averageCost: obj[0].averageCost
		})
	} catch (error) {
		console.error(error)
	}
}

// static method to get sim of plan costs for employer
planCardSchema.statics.getSumCost = async function (employerId) {
	console.log('calculating sum cost...'.magenta)
	const obj = await this.aggregate([
		{
			$match: { employer: employerId }
		},
		{
			$group: {
				_id: '$employer',
				sumCost: { $sum: '$planValue' }
			}
		}
	])
	try {
		await this.model('Employer').findByIdAndUpdate(employerId, {
			sumCost: obj[0].sumCost
		})
	} catch (error) {
		console.error(error)
	}
}

// call getAverageCost and getSumCost after save
planCardSchema.post('save', async function () {
	this.constructor.getAverageCost(this.employer)
	this.constructor.getSumCost(this.employer)
})

// call getAverageCost and getSumCost after remove
planCardSchema.pre('remove', async function () {
	this.constructor.getAverageCost(this.employer)
	this.constructor.getSumCost(this.employer)
})

const PlanCard = mongoose.model('PlanCard', planCardSchema)

export default PlanCard
