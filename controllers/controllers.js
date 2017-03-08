var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
		res.render("index", {title: 'News Scraper'});
});

router.get("/saved", function(req, res) {
		res.render("saved", {title: 'News Scraper'});
});

var request = require("request");
var cheerio = require("cheerio");

request('https://www.bbc.com/news/world', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
	$('span.title-link__title-text').each(function(i, element) {
		var title = $(this);
		var a = $(this).parent().parent();
		console.log(title.text(), a.href);

	})
  }
});

module.exports = router;