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

var metadata = {};
var firstArr = [];
var secondArr = [];

router.post("/getArticles", function (req, res) {
	
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
	res.send(firstArr);
	firstArr = [];
});
// function next() {
// 	for (let i = 0; i < firstArr.length; i++) {
// 		var URL = firstArr[i].link;
// 		pullStory(i, URL);
// 	}
// }

// function pullStory(i, URL) {
// 	var metastory = {
// 		id: i,
// 		image: null,
// 		story: null
// 	};
// 	request(URL, function (error, response, html) {
// 		if (!error && response.statusCode == 200) {
// 			var $ = cheerio.load(html);
// 			$('img').each(function (element) {
// 				if ($(this).hasClass('js-image-replace')) {
// 					var image = $(this).attr('src');
// 					metastory.image = image;
// 				}
// 				// secondArr.push({ image: metastory.image });
// 			});
// 			$('p').each(function (element) {
// 				if ($(this).hasClass('story-body__introduction')) {
// 					var story = $(this).text();
// 					metastory.story = story;
// 				secondArr.push(metastory);
// 				}
// 			});
// 		}
// 	});
// }


module.exports = router;