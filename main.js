const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const mongoose = require('mongoose')
const app = express()
const imgs = require('./imgs')
require('./db')
const port = process.env.PORT || 3000

app.use(express.json())

const upload = multer({
	limits: {
		fileSize: 2000000
	},
	fileFilter(req, file, cb) {
		if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
			return cb(new Error('File must be a IMAGE'))
		}
		cb(undefined, true)
	}
})

app.post('/upload', upload.single('upload'), async (req, res) => {
	const img = new imgs()
	const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
	img.num = buffer
	await img.save()
	res.send('')
},(error, req, res, next) => {
	res.status(400).send({ error: error.message })
})

app.get('/see', async (req, res) => {
	const img =  await imgs.find({})
	console.log(img)
	res.send(img)
})

app.listen(port, () => {
	console.log('Listening on port', port)
})