const mongoose = require('mongoose')

const imgs = mongoose.model('imgs', {
	num: {
		type: Buffer
	}
})

module.exports = imgs