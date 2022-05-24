//* -----------------------------------------------------------------------
//*  Employer Model -->

// @imports
import mongoose from 'mongoose'
import slugify from 'slugify'

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
		},
		averageCost: Number,
		sumCost: Number,
		photo: {
			type: String,
			default: 'no-photo.jpg'
		}
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	},
	{
		timestamps: true
	}
)

// create employer slug from the name
employerSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true })
	next()
})

// cascade delete contact when employer is deleted
employerSchema.pre('remove', async function (next) {
	await this.model('Contact').deleteMany({ employer: this._id })

	await this.model('Contract').updateMany(
		{ employer: this._id },
		{
			$set: {
				endDate: new Date(),
				isValid: false
			}
		},
		{ new: true }
	)
})

// add contact field
employerSchema.virtual('contact', {
	ref: 'Contact',
	localField: '_id',
	foreignField: 'employer',
	justOne: false
})

// add employees field
employerSchema.virtual('employees', {
	ref: 'PlanCard',
	localField: '_id',
	foreignField: 'employer',
	justOne: false,
	populated: true
})

// add contracts field
employerSchema.virtual('contracts', {
	ref: 'Contract',
	localField: '_id',
	foreignField: 'employer',
	justOne: false,
	populated: true
})

const Employer = mongoose.model('Employer', employerSchema)

export default Employer
