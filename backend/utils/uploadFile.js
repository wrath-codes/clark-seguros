import fs from 'fs'
import AWS from 'aws-sdk'

const uploadFile = async (file) => {
	// create aws s3 connection
	const s3 = new AWS.S3({
		accessKeyId: process.env.AWS_KEY,
		secretAccessKey: process.env.AWS_SECRET,
		region: process.env.AWS_REGION
	})

	// read content from the file

	// setting up aws s3 upload parameters
	const params = {
		Bucket: process.env.AWS_BUCKET,
		Key: file.name,
		Body: file.data
	}

	const data = await s3.upload(params).promise()
	return data.Location
}

export { uploadFile }
