const express = require('express');
const router = express.Router();

const randomstring = require('randomstring');


const Link = require('./../models/openlinks');


router.get('/', (req, res) => {
	var uniqueLink = randomstring.generate({
				length: 5,
				charset: 'alphabetic',
				capitalization:'lowercase'
			});	unique = true;
	// do{
	//
	// 	Link.findOne({
	// 		url:uniqueLink
	// 	},(err, url) => {
	// 		if(!url){
	// 			unique = true;
	// 			console.log('unique!');
	// 		}else{
	// 			unique = false;
	// 			console.log(unique);
	// 		}
	// 	});
	// 	console.log('dowhile');
	// }
	// while(!unique);

	res.render('index',{
		uniqueLink: uniqueLink
	});
});

router.get('/:link', (req,res) => {
	var requestedLink = req.params.link;
	var username;
	var title;
	var steps;

	Link.findOne({
		url: requestedLink
	}, (err, url) => {
		if (!url){
			res.render('dashboard',{
				existing:'make a new one?'
			});
		}else{
			steps = url.steps;
			var stepsDOMArray = [];

			console.log(url.username);
			console.log(url.title);


			res.render('dashboard', {
				username: url.username,
				title: url.goaltitle,
				stepsDOMArray: steps
		 });
		}
		if(err){
			res.render('dashboard', {
				existing: err
			});
		}
	});
});

module.exports = router;
