//* -----------------------------------------------------------------------
//*  Plan Model -->

// @imports
import mongoose from 'mongoose'

const planSchema = mongoose.Schema(
	{
		operator: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Operator'
		},
		name: {
			type: String,
			required: true
		},
		ansRegister: {
			type: String,
			required: true,
			unique: true
		},
		kind: {
			type: String,
			required: true,
			default: 'health'
		},
		reach: {
			type: String,
			required: [true, 'Por favor selecione uma abrangência'],
			enum: [
				'Grupo de Municipios',
				'Estadual',
				'Grupo de Estados',
				'Nacional'
			]
		}
	},
	{
		timestamps: true
	}
)

const Plan = mongoose.model('Plan', planSchema)

export default Plan
