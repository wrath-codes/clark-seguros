//* -----------------------------------------------------------------------
//*  Employer Model -->

// @imports
import { ObjectId } from 'bson'
import mongoose from 'mongoose'
import Contract from './contractModel.js'

const employerSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		cnpj: {
			type: String,
			required: true,
			unique: true
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
		manager: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Contact'
		},
		numEmployees: {
			type: Number,
			required: true,
			default: 0
		},
		numContracts: {
			type: Number,
			required: true,
			default: 0
		},
		handler: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		contractHistory: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: false,
				ref: 'Contract'
			}
		],
		employees: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: false,
				ref: 'Employee'
			}
		]
	},
	{
		timestamps: true
	}
)

const Employer = mongoose.model('Employer', employerSchema)

export default Employer
