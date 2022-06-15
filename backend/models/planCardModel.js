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
		titular: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Employee'
		},
		identifier: {
			type: String,
			required: true,
			unique: true
		},
		isCoop: {
			type: Boolean,
			required: true,
			default: false
		},
		coopPercentage: {
			type: Number,
			required: true,
			default: 10
		},
		plan: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Plan'
		},
		planValue: Number,
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
planCardSchema.statics.getAverageCostEmployer = async function (employerId) {
	const employer = await this.model('Employer').findById(employerId)
	console.log(`calculating average cost of employer ${employer.name}...`.blue)

	const employeeCount = await this.model('PlanCard')
		.find({ employer: employerId })
		.countDocuments()

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
		if (employeeCount <= 0) {
			await this.model('Employer').findByIdAndUpdate(employerId, {
				averageCost: undefined
			})
		} else {
			await this.model('Employer').findByIdAndUpdate(employerId, {
				averageCost: obj[0].averageCost.toFixed(2)
			})
		}
	} catch (error) {
		console.error(error)
	}
}

// static method to get sim of plan costs for employer
planCardSchema.statics.getSumCostEmployer = async function (employerId) {
	const employer = await this.model('Employer').findById(employerId)
	console.log(`calculating sum cost of employer ${employer.name}...`.magenta)

	const employeeCount = await this.model('PlanCard')
		.find({ employer: employerId })
		.countDocuments()

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
		if (employeeCount <= 0) {
			await this.model('Employer').findByIdAndUpdate(employerId, {
				sumCost: undefined
			})
		} else {
			await this.model('Employer').findByIdAndUpdate(employerId, {
				sumCost: obj[0].sumCost.toFixed(2)
			})
		}
	} catch (error) {
		console.error(error)
	}
}

// static method to get average plan costs for employer
planCardSchema.statics.getAverageCostContract = async function (contractId) {
	const contract = await this.model('Contract').findById(contractId)
	console.log(`calculating average cost of contract ${contract.name}...`.blue)

	const employeeCount = await this.model('PlanCard')
		.find({ contract: contractId })
		.countDocuments()

	const obj = await this.aggregate([
		{
			$match: { contract: contractId }
		},
		{
			$group: {
				_id: '$contract',
				averageCost: { $avg: '$planValue' }
			}
		}
	])
	try {
		if (employeeCount <= 0) {
			await this.model('Contract').findByIdAndUpdate(contractId, {
				averageCost: undefined
			})
		} else {
			await this.model('Contract').findByIdAndUpdate(contractId, {
				averageCost: obj[0].averageCost.toFixed(2)
			})
		}
	} catch (error) {
		console.error(error)
	}
}

// static method to get sim of plan costs for contract
planCardSchema.statics.getSumCostContract = async function (contractId) {
	const contract = await this.model('Contract').findById(contractId)
	console.log(`calculating sum cost of contract ${contract.name}...`.magenta)
	const employeeCount = await this.model('PlanCard')
		.find({ contract: contractId })
		.countDocuments()

	const obj = await this.aggregate([
		{
			$match: { contract: contractId }
		},
		{
			$group: {
				_id: '$contract',
				sumCost: { $sum: '$planValue' }
			}
		}
	])
	try {
		if (employeeCount <= 0) {
			await this.model('Contract').findByIdAndUpdate(contractId, {
				sumCost: undefined
			})
		} else {
			await this.model('Contract').findByIdAndUpdate(contractId, {
				sumCost: obj[0].sumCost.toFixed(2)
			})
		}
	} catch (error) {
		console.error(error)
	}
}

// recalculates averageCost and sumCost for employers and contracts
planCardSchema.methods.recalculateCosts = async function () {
	await this.constructor.getSumCostEmployer(this.employer)
	await this.constructor.getAverageCostEmployer(this.employer)
	await this.constructor.getSumCostContract(this.contract)
	await this.constructor.getAverageCostContract(this.contract)
}

// call getAverageCostEmployer, getSumCostEmployer, getSumCostContract and getAverageCostContract after save
planCardSchema.post('save', async function () {
	await this.constructor.getSumCostEmployer(this.employer)
	await this.constructor.getAverageCostEmployer(this.employer)
	await this.constructor.getSumCostContract(this.contract)
	await this.constructor.getAverageCostContract(this.contract)
})

// call getAverageCostEmployer, getSumCostEmployer, getSumCostContract and getAverageCostContract before remove
planCardSchema.pre('remove', async function () {
	await this.constructor.getSumCostEmployer(this.employer)
	await this.constructor.getAverageCostEmployer(this.employer)
	await this.constructor.getSumCostContract(this.contract)
	await this.constructor.getAverageCostContract(this.contract)
})

// adds titular pre-save
planCardSchema.pre('save', async function () {})

// method to recalculate planValue
planCardSchema.method.recalculatePlanValue = async function (employee, plan) {
	if (employee.age >= 0 && employee.age <= 18) {
		planValue = plan.ageRangeValue.from0To18
	} else if (employee.age >= 19 && employee.age <= 23) {
		planValue = plan.ageRangeValue.from19To23
	} else if (employee.age >= 24 && employee.age <= 28) {
		planValue = plan.ageRangeValue.from24To28
	} else if (employee.age >= 29 && employee.age <= 33) {
		planValue = plan.ageRangeValue.from29To33
	} else if (employee.age >= 34 && employee.age <= 38) {
		planValue = plan.ageRangeValue.from34To38
	} else if (employee.age >= 39 && employee.age <= 43) {
		planValue = plan.ageRangeValue.from39To43
	} else if (employee.age >= 44 && employee.age <= 48) {
		planValue = plan.ageRangeValue.from44To48
	} else if (employee.age >= 49 && employee.age <= 53) {
		planValue = plan.ageRangeValue.from49To53
	} else if (employee.age >= 54 && employee.age <= 58) {
		planValue = plan.ageRangeValue.from54To58
	} else {
		planValue = plan.ageRangeValue.from59AndAbove
	}
}

const PlanCard = mongoose.model('PlanCard', planCardSchema)

export default PlanCard
