const mongoose = require('mongoose');
require('./imgs')
mongoose.connect('mongodb+srv://sgbtech96:nptel@92@cluster0-hluvl.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
})
console.log('Connected to db')
