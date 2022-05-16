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
import Employment from './models/employmentModel.js'
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
		await Employment.deleteMany()
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

		// import contacts
		const createdContacts = await Contact.insertMany(contacts)
		console.log('Contacts Imported'.green)

		//? import operators and adds respective contacts
		let sampleOperators = []
		for (let i = 0; i < operators.length; i++) {
			let contactTo = await Contact.find({
				cnpj: operators[i].cnpj
			})
			sampleOperators.push({
				...operators[i],
				contact: contactTo[0]._id
			})
		}
		await Operator.insertMany(sampleOperators)
		console.log('Operators Imported!'.green.inverse)

		//? import plans and adds respective operators
		let samplePlans = []
		for (let i = 0; i < plans.length; i++) {
			let operatorTo = await Operator.find({
				cnpj: plans[i].operator
			})
			samplePlans.push({
				...plans[i],
				operator: operatorTo[0]._id
			})
		}
		await Plan.insertMany(samplePlans)
		console.log('Plans Imported!'.green)

		//? import employers, adds respective contracts and adds admin user as handler
		let sampleEmployers = []
		for (let i = 0; i < employers.length; i++) {
			let managerTo = await Contact.find({ cnpj: employers[i].cnpj })
			sampleEmployers.push({
				...employers[i],
				manager: managerTo[0]._id,
				handler: adminUser
			})
		}
		await Employer.insertMany(sampleEmployers)
		console.log('Employers Imported!'.green.inverse)

		//? import contracts, adds respective employer and operator
		let sampleContracts = []
		for (let i = 0; i < contracts.length; i++) {
			let operatorTo = await Operator.findOne({
				cnpj: contracts[i].operator
			})
			let employerTo = await Employer.findOne({
				cnpj: contracts[i].employer
			})
			let startDate = new Date(contracts[i].startDate)
			sampleContracts.push({
				...contracts[i],
				operator: operatorTo._id,
				employer: employerTo._id
			})
		}
		await Contract.insertMany(sampleContracts)
		console.log('Contracts Imported!'.green)

		//? import employees, adds respective employer and contract
		let sampleEmployees = []
		for (let i = 0; i < employees.length; i++) {
			let employerTo = await Employer.find({
				cnpj: employees[i].employer
			})
			let contractTo = await Contract.find({
				identifier: employees[i].contract
			})
			sampleEmployees.push({
				...employees[i],
				employer: employerTo[0]._id,
				contract: contractTo[0]._id
			})
		}
		await Employee.insertMany(sampleEmployees)
		console.log('Employees Imported!'.green.inverse)

		//? import opticMarks, adds respective employee and plan
		let samplePlanCards = []
		for (let i = 0; i < planCards.length; i++) {
			let employeeTo = await Employee.find({
				cpf: planCards[i].employee
			})
			let planTo = await Plan.find({
				ansRegister: planCards[i].plan
			})
			samplePlanCards.push({
				...planCards[i],
				employee: employeeTo[0]._id,
				plan: planTo[0]._id
			})
		}
		await PlanCard.insertMany(samplePlanCards)
		console.log('Optic Marks Imported!'.green)

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
		await Employment.deleteMany()
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
