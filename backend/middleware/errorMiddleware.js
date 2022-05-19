const errorHandler = (error, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
	res.status(statusCode)
	res.json({
		success: false,
		message: error.message,
		stack: process.env.NODE_ENV === 'production' ? null : error.stack
	})
}

const notFound = (req, res, next) => {
	const error = new Error(`Not found = ${req.originalUrl}`)
	res.status(404)
	next(error)
}

export { notFound, errorHandler }
