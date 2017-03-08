var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
		res.render("index", {title: 'News Scraper'});
});

module.exports = router;