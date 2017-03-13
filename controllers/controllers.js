var express = require("express");
var router = express.Router();

var request = require("request");
var cheerio = require("cheerio");
var mongojs = require("mongojs");

// Database configuration
var databaseUrl = "mongodb://heroku_qk1td2p1:ov6l4deofcb3o2kkcsmunaljq2@ds123370.mlab.com:23370/heroku_qk1td2p1"
// var databaseUrl = "MongoNewsDB";
var collections = ["savedStories"];

// // Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);

router.get("/", function (req, res) {
	res.render("index", { pagename: 'News Scraper' });
});

router.get("/saved", function (req, res) {
	res.render("saved", { title: 'News Scraper' });
});

var metadata = {};
var firstArr = [];

router.get("/getArticles", function (req, res) {

	request('https://www.bbc.com/news/world', function (error, response, html) {
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(html);

			$('span.title-link__title-text').each(function (i, element) {

				var title = $(this).text();
				var a = $(this).find("a");
				var aRoot = 'https://www.bbc.com';
				var aPath = a.attr('href');
				a = aRoot + aPath;

				var metadata = {
					id: null,
					title: null,
					link: null,
				};

				metadata.id = i;
				metadata.title = title;
				metadata.link = a;
				firstArr.push(metadata);

				return i < 19;
			});
		}
	});
	res.json(firstArr);
	firstArr = [];
});

router.get("/savedArticles", function (req, res) {
	var title = req.query.title;
	var link = req.query.link;

	if (title && link) {
		db.savedStories.save({
			title: title,
			link: link
		}, function (error, saved) {
			if (error) {
				console.log(error);
			} else {
				console.log("saved");
			}
		});
	}
	res.json({ title: title, link: link });
	console.log(title);
});


module.exports = router;