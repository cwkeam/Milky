const express = require('express');
const http = require('http');
const hbs = require('hbs');
const path = require('path');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const Link = require('./models/openlinks');


mongoose.connect('mongodb://localhost:/milky');
// 'mongodb://cwkeam:76424you@ds147821.mlab.com:47821/milky'
var port = process.env.PORT || 8000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);





io.on('connection', (socket) => {
	console.log('connected');
	socket.on('sendForm', function(doc){
		var username = doc.username;
		var goaltitle = doc.goaltitle;
		var stepsArray = doc.stepsArray;
		var requestingUrl = doc.requestingUrl;
		Link.findOne({
			url: requestingUrl
		}, function(err, link){
			if(!link){
				socket.emit('redirect', {
					url:requestingUrl
				});
				var newLink = new Link({
					url:requestingUrl,
					username:username,
					steps:stepsArray
				});
				newLink.save((err)=>{
					if(err){
						console.log(err);
					}else{
						console.log('succesfully saved link');
					}
				});
			}else{
				socket.emit('taken');
			}
			if(err){
				socket.emit('err');
			}
		});






	});
});

const publicPath = path.join(__dirname, '/public');
app.use('/public/', express.static(publicPath));
app.use(bodyParser.urlencoded({extended: true}));




const routes = require('./routes/index');
app.set('view engine', 'hbs');
app.use('/', routes);





server.listen(port, () => {
	console.log('Port is up and running in', port);}
)
