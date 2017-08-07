const express = require('express');
const http = require('http');
const hbs = require('hbs');
const path = require('path');

var port = process.env.PORT || 8000;

var app = express();
var server = http.createServer(app);
const publicPath = path.join(__dirname, '/public');
app.set('view engine', 'hbs');
app.use('/public/', express.static(publicPath));

const routes = require('./routes/index');

app.use('/', routes);

server.listen(port, () => {
	console.log('Port is up and running in', port);}
)

