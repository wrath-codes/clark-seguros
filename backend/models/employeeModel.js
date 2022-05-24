//* -----------------------------------------------------------------------
//*  Employee Model -->

// @imports
import mongoose from 'mongoose'

import Employer from './employerModel.js'
import Contract from './contractModel.js'
import PlanCard from './planCardModel.js'

const employeeSchema = mongoose.Schema(
	{
		name: {
			firstName: {
				type: String,
				required: [true, 'Por favor adicione o primeiro nome do contato'],
				maxlength: [50, 'O primeiro nome não pode exceder 50 caracteres']
			},
			lastName: {
				type: String,
				required: [true, 'Por favor adicione o sobrenome do contato'],
				maxlength: [200, 'O sobrenome não pode exceder 200 caracteres']
			}
		},
		cpf: {
			type: String,
			required: [true, 'Please add an cpf'],
			match: [/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Please add an valid cpf number'],
			unique: true
		},
		dateOfBirth: {
			type: Date,
			required: true
		},
		age: {
			type: Number,
			required: true,
			default: 0
		},
		sex: {
			type: String,
			required: true,
			enum: ['Masculino', 'Feminino']
		},
		maritalStatus: {
			type: String,
			required: true,
			enum: ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viuvo(a)']
		},

		mothersName: {
			firstName: {
				type: String,
				required: [true, 'Por favor adicione o primeiro nome do contato'],
				maxlength: [50, 'O primeiro nome não pode exceder 50 caracteres']
			},
			lastName: {
				type: String,
				required: [true, 'Por favor adicione o sobrenome do contato'],
				maxlength: [200, 'O sobrenome não pode exceder 200 caracteres']
			}
		},

		address: {
			street: { type: String, required: true },
			streetNumber: { type: String, required: true },
			complement: { type: String, required: false },
			neighborhood: { type: String, required: true },
			city: { type: String, required: true },
			cep: { type: String, required: true },
			state: { type: String, required: true },
			country: { type: String, required: true, default: 'Brasil' }
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

// cascade delete planCard
employeeSchema.pre('remove', async function (next) {
	await this.model('PlanCard').findOneAndDelete({ employee: this._id })
})

// pre save get age
employeeSchema.pre('save', async function (next) {
	this.age = Math.floor((Date.now() - this.dateOfBirth.getTime()) / (1000 * 3600 * 24 * 365))
})

employeeSchema.virtual('planCard', {
	ref: 'PlanCard',
	localField: '_id',
	foreignField: 'employee',
	justOne: true
})

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee
