const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
	res.render('index',{
		uniqueLink: 'nodejs'
	});
});

module.exports = router;
