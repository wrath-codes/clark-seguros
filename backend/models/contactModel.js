//* -----------------------------------------------------------------------
//*  Contact Model -->

// @imports
import mongoose from 'mongoose'

const contactSchema = mongoose.Schema(
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
		telephone: {
			type: String,
			required: [false, 'Por favor adicione o telefone'],
			match: [
				/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
				'Por favor adicione um telefone válido!'
			]
		},
		cellphone: {
			type: String,
			required: [true, 'Por favor adicione o celular'],
			match: [
				/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
				,
				'Por favor adicione um celular válido!'
			]
		},
		email: {
			type: String,
			required: [true, 'Por favor adicione o email'],
			unique: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Por favor adicione um email válido!'
			]
		},
		kind: {
			type: String,
			required: [true, 'Por favor selecione o tipo de contato'],
			enum: ['Operadora', 'Cliente'],
			default: 'Cliente'
		},
		operator: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'Operator'
		},
		employer: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'Employer'
		}
	},
	{
		timestamps: true
	}
)

const Contact = mongoose.model('Contact', contactSchema)

export default Contact
