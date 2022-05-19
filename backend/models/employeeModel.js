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
			match: [/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Please add an valid cpf number']
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
		timestamps: true
	}
)

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee
