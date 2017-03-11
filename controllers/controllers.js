var express = require("express");
var router = express.Router();

var request = require("request");
var cheerio = require("cheerio");
var mongojs = require("mongojs");

// Database configuration
var databaseUrl = "MongoNewsDB";
var collections = ["savedStories"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

router.get("/", function (req, res) {
	res.render("index", { title: 'News Scraper' });
});

router.get("/saved", function (req, res) {
	db.savedStories.find({}, function(found) {

	res.render("saved", {found});
	});
});

var metadata = {};
var firstArr = [];
var secondArr = [];

router.get("/getArticles", function (req, res) {
	
	request('https://www.bbc.com/news/world', function (error, response, html) {
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(html);

			$('span.title-link__title-text').each(function (i, element) {

				var title = $(this).text();
				var a = $(this).parent().parent();
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

router.get("/savedArticles", function(req, res) {
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
				console.log(saved);
			}
		});
	};
	res.json({title: title, link: link});
});


module.exports = router;