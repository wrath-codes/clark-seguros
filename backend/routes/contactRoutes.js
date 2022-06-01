//* Contact Routes
//* -------------------------------
// imports
// @libraries
import express from 'express'
const router = express.Router({ mergeParams: true })
// @controller
import {
	getContacts,
	getContact,
	createContact,
	updateContact,
	deleteContact
} from '../controllers/contactController.js'
// @middleware
import { protect, authorize } from '../middleware/authProtectMiddleware.js'
// uses
router.use(protect)
router.use(authorize('admin', 'staff'))

//* @routes
//* -------------------------------------------------------------

// @desc    Get Contacts | Create Contact
// @route   /api/contacts
// @access  Private
// --------------------------------------------------------------

router.route('/').get(getContacts).post(createContact)

//* -------------------------------------------------------------

// @desc    Get Contact | Delete Contact | Update Contact
// @route   /api/contacts/:id
// @access  Private
// --------------------------------------------------------------
router.route('/:id').get(getContact).delete(deleteContact).put(updateContact)

//* -------------------------------------------------------------
export default router
