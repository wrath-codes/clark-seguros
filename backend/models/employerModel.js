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
			required: [true, 'Por favor adicione o nome do Cliente'],
			unique: true,
			trim: true
		},
		slug: String,
		cnpj: {
			type: String,
			required: [true, 'Por favor adicione o CNPJ'],
			unique: true,
			match: [
				/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
				'Por favor adicione um CNPJ válido!'
			]
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
		}
	},
	{
		timestamps: true
	}
)

const Employer = mongoose.model('Employer', employerSchema)

export default Employer
