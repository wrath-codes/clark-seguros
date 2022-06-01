//* -----------------------------------------------------------------------
//*  Operator Model -->

// @imports
import mongoose from 'mongoose'
import slugify from 'slugify'

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
		},
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

// create operator slug from the name
operatorSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true })
	next()
})

operatorSchema.pre('update', function (next) {
	if (this.isModified('name')) {
		this.slug = slugify(this.name, { lower: true })
		next()
	}
})

// cascade delete plans when operator is deleted
operatorSchema.pre('remove', async function (next) {
	await this.model('Plan').deleteMany({ operator: this._id })
	await this.model('Contact').deleteMany({ operator: this._id })

	await this.model('Contract').updateMany(
		{ operator: this._id },
		{
			$set: {
				endDate: new Date(),
				isValid: false
			}
		},
		{ new: true }
	)
})

// reverse populate with virtuals
// add plans field
operatorSchema.virtual('plans', {
	ref: 'Plan',
	localField: '_id',
	foreignField: 'operator',
	justOne: false
})
// add contracts field
operatorSchema.virtual('contracts', {
	ref: 'Contract',
	localField: '_id',
	foreignField: 'operator',
	justOne: false
})
// add contact field
operatorSchema.virtual('contact', {
	ref: 'Contact',
	localField: '_id',
	foreignField: 'operator',
	justOne: true
})

const Operator = mongoose.model('Operator', operatorSchema)

export default Operator
