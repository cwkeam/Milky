const express = require('express');
const router = express.Router();
const hbs = require('hbs');
const randomstring = require('randomstring');


const Link = require('./../models/openlinks');

hbs.registerHelper("inProgressCheck", (status) => {
	if(status == 'progress'){
		console.log('if!!!!' + status);
		return 'in progress';
	}else{
		console.log('else!!!!!' + status)
		return status
	}
});

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
			res.render('newlink');
		}else{
			steps = url.steps;
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
router.post('/:link', (req,res) => {
	var requestedLink = req.params.link;
	var newlink = new Link({
		url:requestedLink
	});
	newlink.save();
	res.redirect(requestedLink);
});

module.exports = router;
