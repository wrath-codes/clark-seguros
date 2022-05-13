//* -----------------------------------------------------------------------
//*  Operator Model -->

// @imports
import mongoose from 'mongoose'

const operatorSchema = mongoose.Schema(
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
		website: {
			type: String,
			required: true,
			unique: true
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
		},
		contact: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Contact'
		},
		numPlans: {
			type: Number,
			required: true,
			default: 0
		}
	},
	{
		timestamps: true
	}
)

const Operator = mongoose.model('Operator', operatorSchema)

export default Operator
