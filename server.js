var express = require('express')
var app = express()
app.use(express.static(__dirname+'/static'))
app.listen(3030, function(){
	console.log('port is 3030')
})