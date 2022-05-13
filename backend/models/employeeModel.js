//* -----------------------------------------------------------------------
//*  Employee Model -->

// @imports
import mongoose from 'mongoose'

const employeeSchema = mongoose.Schema(
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
		cpf: {
			type: String,
			required: true,
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
				required: true
			},
			lastName: {
				type: String,
				required: true
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
			required: true,
			unique: true
		},
		cellphone: {
			type: String,
			required: true
		},
		employer: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Employer'
		},
		contract: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Contract'
		}
	},
	{
		timestamps: true
	}
)

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee
