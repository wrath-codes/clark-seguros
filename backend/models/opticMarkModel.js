//* -----------------------------------------------------------------------
//*  opticMark Model -->

// @imports
import mongoose from 'mongoose'

const opticMarkSchema = mongoose.Schema({
	employee: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Employee'
	},
	identifier: {
		type: String,
		required: true,
		unique: true
	},
	plan: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Plan'
	},
	planValue: {
		type: String,
		required: true
	},
	planValueHistory: [
		{
			change: { type: Date, required: true },
			value: { type: Number, required: true }
		}
	],
	kind: {
		type: String,
		required: true,
		enum: ['Titular', 'Conjuge', 'Filho/Filha', 'Mãe/Pai']
	},
	lives: {
		type: Number,
		required: true,
		default: 1
	}
})

const OpticMark = mongoose.model('OpticMark', opticMarkSchema)

export default OpticMark
