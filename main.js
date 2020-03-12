const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
var Jimp = require('jimp')
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
	const img = await imgs.find({})
	var a = 0
	img.forEach((i) => {
		a += 1
		const pixelSize = 256
		var image = new Jimp(pixelSize, pixelSize, function (err, image) {
	    let buffer = i.num
	    for (var x = 0; x < pixelSize; x++) {
	      	for (var y = 0; y < pixelSize; y++) {
			      const offset = (y * pixelSize + x) * 4 // RGBA = 4 bytes
			      buffer[offset    ] = x    // R
			      buffer[offset + 1] = y    // G
			      buffer[offset + 2] = 0    // B
			      buffer[offset + 3] = 255  // Alpha
	   		 }
	  	}
	})
	image.write('/frames/pic' + a +'.png')
	})
	
})

app.listen(port, () => {
	console.log('Listening on port', port)
})