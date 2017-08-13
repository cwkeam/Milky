const express = require('express');
const http = require('http');
const hbs = require('hbs');
const path = require('path');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const Link = require('./models/openlinks');


mongoose.connect(process.env.MONGODB_URL);
//
var port = process.env.PORT || 8000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {

	socket.on('sendForm', function(doc){
		var username = doc.username;
		var goaltitle = doc.goaltitle;
		var stepsArray = doc.stepsArray;
		var requestingUrl = doc.requestingUrl;
		Link.findOne({
			url: requestingUrl
		}, function(err, link){
			if(!link){
				var newLink = new Link({
					url:requestingUrl,
					username,
					goaltitle
				});
				function loopThrough(callback) {
					for(var i=0; i<stepsArray.length; i++){
						newLink.steps.push({type: stepsArray[i].type, description: stepsArray[i].input, index: i+1, status:'start'});
					}
					callback();
				}
				loopThrough(()=>{
					newLink.save((err)=>{
						if(err){
							console.log(err);
						}else{
							console.log('succesfully saved link');
						}
					});
				});
				socket.emit('redirect', {
					url:requestingUrl
				});
			}else{
				socket.emit('taken');
			}
			if(err){
				socket.emit('err');
			}
		});
	});

	//changing courses
	socket.on('changing course', (doc) => {
		Link.findOne({
			url:doc.url
		},(err, dbdoc) => {
			if(dbdoc){
				dbdoc.steps[doc.index].type = doc.changedTo;
				dbdoc.save((err) => {
					if (err) return handleError(err);
				});
			}
		});
	});
	socket.on('changing status', (doc)=>{
		var changedTo = '';
		console.log(changedTo);

		if (doc.changedTo =='in progress'){
			changedTo = 'progress';
		}else{
			changedTo = doc.changedTo;
			console.log(changedTo);
		}
		Link.findOne({
			url:doc.url
		},(err, dbdoc) => {
			if(dbdoc){
				dbdoc.steps[doc.index].status = changedTo;
				dbdoc.save((err) => {
				});
			}
		});
	});


	// add steps
	socket.on('addStepDiv',(doc)=>{
		Link.findOne({
			url:doc.url
		},(err, dbdoc) => {
			if(dbdoc){
				dbdoc.steps.push({type:'course', description:'enter a title', index:doc.index, status: 'start'});
				dbdoc.save((err) => {
			    if (err) return handleError(err);
					socket.emit('addStepDiv complete');
				});
			}else{
				console.log('else');
			}
			if(err){
				console.log('eerr');
			}
		});
	});
	socket.on('deleteStepDiv', (doc) => {
		Link.update({
			url:doc.url
		},{$pull:{
			steps: { index: doc.index }
		}},()=>{
			socket.emit('deleteStepDiv completed',{
				index:doc.index
			});
		});
	});
	socket.on('save input', (doc) => {
		Link.findOne({
			url:doc.url
		}, (err, dbdoc)=>{
			if(err){
				return console.log('err');
			}
			if(!doc){
				return console.log('!doc');
			}
			if(doc){
				if(doc.type == 'title description'){
					dbdoc.steps[doc.index].description = doc.text;
					dbdoc.save((err) => {
				    if (err) return handleError(err);
					});
				}
				if(doc.type == 'long description'){
					dbdoc.steps[doc.index].longdescription = doc.text;
					dbdoc.save((err) => {
				    if (err) return handleError(err);
					});
				}
			}
		});
	});
	socket.on('changing title', (doc) => {
		Link.findOne({
			url:doc.url
		}, (err, dbdoc) => {
			if(dbdoc){
				if(doc.type == 'username'){
					dbdoc.username = doc.changedTo;
					dbdoc.save();
				}
				if(doc.type == 'goal'){
					dbdoc.goaltitle = doc.changedTo;
					dbdoc.save();
				}

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
