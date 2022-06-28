//*           Employer Contact
//* ----------------------------------------
// @imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// @features
import {
	addContactToEmployer,
	updateContactToEmployer,
	getEmployer
} from '../../features/employer/employerSlice'
// @flowbite
import { TextInput, Select, Label, Modal, Checkbox } from 'flowbite-react'
// @icons
import { FaRoad, FaPercentage } from 'react-icons/fa'
import { MdEdit, MdEmail } from 'react-icons/md'
import { HiIdentification, HiLocationMarker } from 'react-icons/hi'
import { GrTextAlignLeft } from 'react-icons/gr'
import { BsTelephoneFill, BsCalendar3 } from 'react-icons/bs'
import { AiOutlineNumber } from 'react-icons/ai'
import { IoIosAdd } from 'react-icons/io'

import React from 'react'

const ClienteContact = ({ employer }) => {
	const dispatch = useDispatch()

	// set contact data
	const [contactData, setContactData] = useState({
		firstName: '',
		lastName: '',
		telephone: '',
		cellphone: '',
		email: ''
	})
	const { firstName, lastName, telephone, cellphone, email } = contactData

	const onChange = (e) => {
		setContactData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const onContactAdd = (e) => {
		e.preventDefault()
		const sendData = {
			firstName: firstName,
			lastName: lastName,
			telephone: telephone,
			cellphone: cellphone,
			email: email,
			kind: 'Cliente',
			cnpj: employer.cnpj
		}
		dispatch(addContactToEmployer(sendData))
		dispatch(getEmployer(employer._id))
		window.location.reload()
	}

	const onContactEdit = (e) => {
		e.preventDefault()
		const sendData = {
			name: { firstName: firstName, lastName: lastName },
			telephone: telephone,
			cellphone: cellphone,
			email: email
		}
		dispatch(updateContactToEmployer(sendData))
		dispatch(getEmployer(employer._id))
	}

	const getContactData = (e) => {
		if (!employer.contact) {
			setContactData({
				firstName: '',
				lastName: '',
				telephone: '',
				cellphone: '',
				email: ''
			})
		} else {
			setContactData({
				firstName: employer.contact.name?.firstName,
				lastName: employer.contact.name?.lastName,
				telephone: employer.contact.telephone,
				cellphone: employer.contact.cellphone,
				email: employer.contact.email
			})
		}
	}
	return (
		<>
			{employer.contact ? (
				<div className='mt-5 text-xl font-semibold contact mb-2'>
					Contato{' '}
					<label
						className='btn btn-warning btn-outline btn-xs transform transition duration-200 hover:scale-110'
						htmlFor='editContactModal'
						onClick={(e) => getContactData(e)}
					>
						<MdEdit />
					</label>
					{/* modal contacts edit */}
					<input type='checkbox' id='editContactModal' className='modal-toggle' />
					<label htmlFor='editContactModal' className='modal cursor-pointer'>
						<label className='modal-box relative' htmlFor=''>
							<h3 className='text-lg font-bold'>Contato</h3>
							<div className='mt-5 items-center'>
								<form onSubmit={onContactEdit} className='flex flex-col gap-3'>
									<div>
										<TextInput
											id='firstName'
											type='firstName'
											placeholder='Nome do Contato'
											name='firstName'
											value={firstName ?? ''}
											onChange={onChange}
											required={true}
											icon={GrTextAlignLeft}
											addon='Nome'
										/>
									</div>
									<div>
										<TextInput
											id='lastName'
											type='lastName'
											placeholder='Sobrenome do Contato'
											name='lastName'
											value={lastName ?? ''}
											onChange={onChange}
											required={true}
											icon={GrTextAlignLeft}
											addon='Sobrenome'
										/>
									</div>
									<div>
										<TextInput
											id='telephone'
											type='telephone'
											placeholder='Telefone do Contato'
											name='telephone'
											value={telephone ?? ''}
											onChange={onChange}
											required={false}
											icon={BsTelephoneFill}
											addon='Telefone'
										/>
									</div>
									<div>
										<TextInput
											id='cellphone'
											type='cellphone'
											placeholder='Celular do Contato'
											name='cellphone'
											value={cellphone ?? ''}
											onChange={onChange}
											required={true}
											icon={BsTelephoneFill}
											addon='Celular'
										/>
									</div>
									<div>
										<TextInput
											id='email'
											type='email'
											placeholder='Email do Contato'
											name='email'
											value={email ?? ''}
											onChange={onChange}
											required={true}
											icon={MdEmail}
											addon='Email'
										/>
									</div>
									<button
										type='submit'
										className='btn btn-outline btn-success btn-sm mb-2 '
									>
										Editar
									</button>
								</form>
							</div>
						</label>
					</label>
					{/* Contact Info */}
					<div className=' w-full rounded-lg shadow-lg border-2 bg-base-100 mt-3 stats stats-vertical lg:stats-horizontal md:stats-vertical sm:stats-vertical '>
						<div className='stat'>
							<div className='stat-title text-md'>Nome</div>
							<div className='text-lg stat-value'>
								{employer.contact?.name?.firstName}{' '}
								{employer.contact?.name?.lastName}
							</div>
						</div>
						{employer.telephone && (
							<div className='stat'>
								<div className='stat-title text-md'>Telephone</div>
								<div className='text-lg stat-value'>
									{employer.contact?.telephone}
								</div>
							</div>
						)}
						<div className='stat'>
							<div className='stat-title text-md'>Celular</div>
							<div className='text-lg stat-value'>
								{employer.contact?.cellphone}
							</div>
						</div>
						<div className='stat'>
							<div className='stat-title text-md'>email</div>
							<div className='text-lg stat-value'>{employer.contact?.email}</div>
						</div>
					</div>
				</div>
			) : (
				<>
					<label
						className='btn btn-secondary text-base-100 btn-lg justify-around btn-block mb-2'
						htmlFor='addContactModal'
						onClick={getContactData}
					>
						Adicionar Contato
					</label>
					<input type='checkbox' id='addContactModal' className='modal-toggle' />
					<label htmlFor='addContactModal' className='modal cursor-pointer'>
						<label className='modal-box relative' htmlFor=''>
							<h3 className='text-lg font-bold'>Contato</h3>
							<div className='mt-5 items-center'>
								<form onSubmit={onContactAdd} className='flex flex-col gap-3'>
									<div>
										<TextInput
											id='firstName'
											type='firstName'
											placeholder='Nome do Contato'
											name='firstName'
											value={firstName}
											onChange={onChange}
											required={true}
											icon={GrTextAlignLeft}
											addon='Nome'
										/>
									</div>
									<div>
										<TextInput
											id='lastName'
											type='lastName'
											placeholder='Sobrenome do Contato'
											name='lastName'
											value={lastName}
											onChange={onChange}
											required={true}
											icon={GrTextAlignLeft}
											addon='Sobrenome'
										/>
									</div>
									<div>
										<TextInput
											id='telephone'
											type='telephone'
											placeholder='Telefone do Contato'
											name='telephone'
											value={telephone}
											onChange={onChange}
											required={false}
											icon={BsTelephoneFill}
											addon='Telefone'
										/>
									</div>
									<div>
										<TextInput
											id='cellphone'
											type='cellphone'
											placeholder='Celular do Contato'
											name='cellphone'
											value={cellphone}
											onChange={onChange}
											required={true}
											icon={BsTelephoneFill}
											addon='Celular'
										/>
									</div>
									<div>
										<TextInput
											id='email'
											type='email'
											placeholder='Email do Contato'
											name='email'
											value={email}
											onChange={onChange}
											required={true}
											icon={MdEmail}
											addon='Email'
										/>
									</div>
									<button
										type='submit'
										className='btn btn-outline btn-success btn-sm mb-5 '
									>
										Adicionar
									</button>
								</form>
							</div>
						</label>
					</label>
				</>
			)}
		</>
	)
}

export default ClienteContact
