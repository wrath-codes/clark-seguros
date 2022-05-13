//* -----------------------------------------------------------------------
//*  Contact Model -->

// @imports
import mongoose from 'mongoose'

const contactSchema = mongoose.Schema(
	{
		name: {
			firstName: {
				type: String,
				required: true
			},
			lastName: {
				type: String,
				required: true
			}
		},
		telephone: {
			type: String,
			required: false
		},
		cellphone: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		kind: {
			type: String,
			required: [true, 'Por favor selecione o tipo de contato'],
			enum: ['Operadora', 'Cliente'],
			default: 'Cliente'
		},
		cnpj: {
			type: String,
			required: true,
			unique: true
		}
	},
	{
		timestamps: true
	}
)

const Contact = mongoose.model('Contact', contactSchema)

export default Contact
