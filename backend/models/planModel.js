//* -----------------------------------------------------------------------
//*  Plan Model -->

// @imports
import mongoose from 'mongoose'
import slugify from 'slugify'

const planSchema = mongoose.Schema(
	{
		operator: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Operator'
		},
		name: {
			type: String,
			required: [true, 'Por favor adicione o nome do plano']
		},
		slug: String,
		ansRegister: {
			type: String,
			required: true,
			unique: true,
			match: [/^\d{9}$/, 'Por favor adicione um registro ANS válido!']
		},
		kind: {
			type: String,
			required: true,
			default: 'health'
		},
		reach: {
			type: String,
			required: [true, 'Por favor selecione uma abrangência'],
			enum: ['Grupo de Municipios', 'Estadual', 'Grupo de Estados', 'Nacional']
		},
		ageRangeValue: {
			from0To18: { type: Number, required: true },
			from19To23: { type: Number, required: true },
			from24To28: { type: Number, required: true },
			from29To33: { type: Number, required: true },
			from34To38: { type: Number, required: true },
			from39To43: { type: Number, required: true },
			from44To48: { type: Number, required: true },
			from49To53: { type: Number, required: true },
			from54To58: { type: Number, required: true },
			from59AndAbove: { type: Number, required: true }
		}
	},
	{
		timestamps: true
	}
)

// create plan slug from the name
planSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true })
	next()
})

const Plan = mongoose.model('Plan', planSchema)

export default Plan
