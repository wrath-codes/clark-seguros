//* -----------------------------------------------------------------------
//*  Operator Model -->

// @imports
import mongoose from 'mongoose'

const operatorSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Por favor adicione o nome da operadora'],
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
		website: {
			type: String,
			required: [true, 'Por favor adicione o URL do site'],
			unique: true,
			match: [
				/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
				'Por favor adicione um URL válido para o site com HTTP or HTTPS!'
			]
		},
		login: {
			username: { type: String },
			password: { type: String }
		},
		address: {
			street: { type: String, required: true },
			streetNumber: { type: String, required: true },
			complement: { type: String, required: false, default: '' },
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

const Operator = mongoose.model('Operator', operatorSchema)

export default Operator
