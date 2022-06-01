import bcrypt from 'bcryptjs'

const users = [
	{
		name: {
			firstName: 'Raphael',
			lastName: 'Vaz'
		},
		email: 'rvazn.ds@gmail.com',
		password: bcrypt.hashSync('Quel6969!', 10),
		cellphone: '(21)99710-5477',
		role: 'admin'
	},
	{
		name: {
			firstName: 'Ronaldo',
			lastName: 'Miguel'
		},
		email: 'ronaldo@email.com',
		password: bcrypt.hashSync('123456', 10),
		cellphone: '(21)99286-9829',
		role: 'staff'
	},
	{
		name: {
			firstName: 'Ricardo',
			lastName: 'Nogueira'
		},
		email: 'ricardo@email.com',
		password: bcrypt.hashSync('123456', 10),
		cellphone: '(21)99660-6969',
		role: 'client'
	}
]

export default users
