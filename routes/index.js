const express = require('express');
const router = express.Router();

const randomstring = require('randomstring');


const Link = require('./../models/openlinks');


router.get('/', (req, res) => {
	res.render('index',{
		uniqueLink: randomstring.generate({
			length: 5,
  	charset: 'alphabetic',
		capitalization:'lowercase'
		})
	});
});
router.post('/', (req,res) => {

});
router.get('/:link', (req,res) => {
	var requestedLink = req.params.link;
	Link.findOne({
		url: requestedLink
	}, (err, url) => {
		if (!url){
			res.render('dashboard',{
				existing:'make a new one?'
			});
		}else{
			res.render('dashboard', {
				existing: 'here ya go fam'
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
