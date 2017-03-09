var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
	res.render("index", { title: 'News Scraper' });
});

router.get("/saved", function (req, res) {
	res.render("saved", { title: 'News Scraper' });
});

var request = require("request");
var cheerio = require("cheerio");

var objArr = [];
var metadata = {
	id: null,
	title: null,
	link: null,
	image: null,
	story: null
};

request('https://www.bbc.com/news/world', function (error, response, html) {
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
		$('span.title-link__title-text').each(function (i, element) {
			var title = $(this).text();
			var a = $(this).parent().parent();
			var aRoot = 'https://www.bbc.com';
			var aPath = a.attr('href');
			a = aRoot + aPath;

			metadata.id = i;
			metadata.title = title;
			metadata.link = a;
			return i < 19;
		});
	}
	request(metadata.link, function (error, response, html) {
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(html);
			$('img').each(function (i, element) {
				if ($(this).hasClass('js-image-replace')) {
					var image = $(this).attr('src');
					metadata.image = image;
				}
			});
			$('p').each(function (i, element) {
				if ($(this).hasClass('story-body__introduction')) {
					var story = $(this).text();
					metadata.story = story;
				}
			});
		}
		console.log(metadata);
	});
});


module.exports = router;