//* Contact Controller
//* -------------------------------------------------------------
// imports
// @libraries
import asyncHandler from 'express-async-handler'
// @models
import Contact from '../models/contactModel.js'

//* @controller
//* -------------------------------------------------------------

// @desc    Fetch All Contacts
// @route   GET - /api/contacts
// @access  Private
// --------------------------------------------------------------
const getContacts = asyncHandler(async (req, res) => {
	// gets all contacts
	const contacts = await Contact.find({})

	//checks if there are no contacts
	if (contacts.length <= 0) {
		res.status(400)
		throw new Error(
			`There are ${contacts.length} contacts in the database!`
		)
	}

	// response
	res.json(contacts)
})
//* -------------------------------------------------------------

// @desc    Fetch a single Contact
// @route   GET - /api/contacts/:id
// @access  Private
// --------------------------------------------------------------
const getContact = asyncHandler(async (req, res) => {
	// gets contact with id
	const contact = await Contact.findById(req.params.id)

	// checks if there's a contact with that id
	if (contact) {
		// response
		res.json(contact)
	} else {
		res.status(404)
		throw new Error('Contact not found!')
	}
})

//* -------------------------------------------------------------

// @desc    Create a new Contact
// @route   POST - /api/contacts
// @access  Private
// --------------------------------------------------------------
const createContact = asyncHandler(async (req, res) => {
	// destructure contact
	const { firstName, lastName, telephone, cellphone, email, kind, cnpj } =
		req.body

	// checks if all fields are in
	if (!firstName || !lastName || !cellphone || !email || !kind || !cnpj) {
		res.status(400)
		throw new Error('Please add all fields for the Contact!')
	}

	// create the contact
	const contact = await Contact.create({
		name: {
			firstName: firstName,
			lastName: lastName
		},
		telephone: telephone,
		cellphone: cellphone,
		email: email,
		kind: kind,
		cnpj: cnpj
	})

	//response
	res.status(201).json(contact)
})

//* -------------------------------------------------------------

// @desc    Delete a single Contact
// @route   DELETE - /api/contacts/:id
// @access  Private
// --------------------------------------------------------------
const deleteContact = asyncHandler(async (req, res) => {
	// get contact with id
	const contact = await Contact.findById(req.params.id)

	// checks if contact exists
	if (!contact) {
		res.status(404)
		throw new Error('Contact not found!')
	}

	// delete contact
	await contact.delete()

	// success message response
	res.status(200).json({ success: true })
})

//* -------------------------------------------------------------

// @desc    Update a single Contact
// @route   PUT - /api/contacts/:id
// @access  Private
// --------------------------------------------------------------
const updateContact = asyncHandler(async (req, res) => {
	// get contact with id
	const contact = await Contact.findById(req.params.id)

	// checks if contact exists
	if (!contact) {
		res.status(404)
		throw new Error('Contact not found!')
	}

	// edits contact
	const updatedContact = await Contact.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true
		}
	)

	// response
	res.status(200).json(updatedContact)
})

//* -------------------------------------------------------------

export { getContact, getContacts, deleteContact, createContact, updateContact }
