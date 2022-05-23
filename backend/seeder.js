// @libraries
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

// @data
import contacts from './data/contacts.js'
import users from './data/users.js'
import operators from './data/operators.js'
import plans from './data/plans.js'
import employers from './data/employers.js'
import contracts from './data/contracts.js'
import employees from './data/employees.js'
import planCards from './data/planCards.js'

// @models
import User from './models/userModel.js'
import Operator from './models/operatorModel.js'
import Plan from './models/planModel.js'
import Employer from './models/employerModel.js'
import Employee from './models/employeeModel.js'
import Contact from './models/contactModel.js'
import Contract from './models/contractModel.js'
import PlanCard from './models/planCardModel.js'

// @connection
import connectDB from './config/db.js'

dotenv.config()
connectDB()

// import Data
const importData = async () => {
	try {
		await Contract.deleteMany()
		await Contact.deleteMany()
		await Employee.deleteMany()
		await Employer.deleteMany()
		await Plan.deleteMany()
		await Operator.deleteMany()
		await User.deleteMany()
		await PlanCard.deleteMany()

		// import users
		const createdUsers = await User.insertMany(users)
		console.log('Users Imported!'.green.inverse)
		const adminUser = createdUsers[0]._id

		//? import operators
		let sampleOperators = []
		for (let i = 0; i < operators.length; i++) {
			await Operator.create({
				...operators[i]
			})
		}

		// await Operator.insertMany(operators)
		console.log('Operators Imported!'.green)

		//? import plans and adds respective operators
		let samplePlans = []
		for (let i = 0; i < plans.length; i++) {
			const operator = await Operator.findOne({
				cnpj: plans[i].operator
			})
			await Plan.create({
				...plans[i],
				operator: operator._id
			})
		}
		await Plan.insertMany(samplePlans)
		console.log('Plans Imported!'.green.inverse)

		//? import employers
		let sampleEmployers = []
		for (let i = 0; i < employers.length; i++) {
			await Employer.create({
				...employers[i]
			})
		}
		// await Employer.insertMany(employers)
		console.log('Employers Imported!'.green)

		// import contacts
		let sampleContacts = []
		for (let i = 0; i < contacts.length; i++) {
			const operator = await Operator.findOne({ cnpj: contacts[i].cnpj })
			const employer = await Employer.findOne({ cnpj: contacts[i].cnpj })
			await Contact.create({
				name: contacts[i].name,
				cellphone: contacts[i].cellphone,
				telephone: contacts[i].telephone && contacts[i].telephone,
				email: contacts[i].email,
				kind: contacts[i].kind,
				operator: operator && operator._id,
				employer: employer && employer._id
			})
		}
		console.log('Contacts Imported'.green.inverse)

		//? import contracts, adds respective employer and operator
		let sampleContracts = []
		for (let i = 0; i < contracts.length; i++) {
			const operator = await Operator.findOne({
				cnpj: contracts[i].operator
			})
			const employer = await Employer.findOne({
				cnpj: contracts[i].employer
			})

			sampleContracts.push({
				...contracts[i],
				operator: operator._id,
				employer: employer._id
			})
		}
		await Contract.insertMany(sampleContracts)
		console.log('Contracts Imported!'.green)

		//? import employees
		await Employee.insertMany(employees)
		console.log('Employees Imported!'.green.inverse)

		//? create plan cards
		let samplePlanCards = []
		for (let i = 0; i < planCards.length; i++) {
			const employee = await Employee.findOne({ cpf: planCards[i].employee })
			const plan = await Plan.findOne({ ansRegister: planCards[i].plan })
			const employer = await Employer.findOne({ cnpj: planCards[i].employer })
			const contract = await Contract.findOne({ identifier: planCards[i].contract })

			samplePlanCards.push({
				...planCards[i],
				employee: employee._id,
				employer: employer._id,
				contract: contract._id,
				plan: plan._id,
				employmentHistory: {
					employer: employer._id,
					startDate: new Date()
				},
				planHistory: {
					plan: plan._id,
					change: new Date()
				},
				planValueHistory: {
					value: planCards[i].planValue,
					change: new Date()
				},
				contractHistory: {
					contract: contract._id,
					startDate: new Date()
				}
			})
		}

		await PlanCard.insertMany(samplePlanCards)
		console.log('Plan Cards Imported!'.green)

		// End process message
		console.log('Data Imported!'.magenta.underline.bold)
		process.exit()
	} catch (error) {
		console.error(`${error}`.red.inverse)
		// exit with failure
		process.exit(1)
	}
}

// destroy data
const destroyData = async () => {
	try {
		await Contract.deleteMany()
		await Contact.deleteMany()
		await Employee.deleteMany()
		await Employer.deleteMany()
		await Plan.deleteMany()
		await Operator.deleteMany()
		await User.deleteMany()
		await PlanCard.deleteMany()

		// End process message
		console.log('Data Destroyed!'.red.underline.bold)
		process.exit()
	} catch (error) {
		console.error(`${error}`.red.inverse)
		// exit with failure
		process.exit(1)
	}
}

// setup terminal calls
if (process.argv[2] === '-d') {
	destroyData()
} else {
	importData()
}
