const express = require('express')
const multer = require('multer')
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
	img.num = req.file.buffer
	await img.save()
	res.send('')
},(error, req, res, next) => {
	res.status(400).send({ error: error.message })
})

app.listen(port, () => {
	console.log('Listening on port', port)
})