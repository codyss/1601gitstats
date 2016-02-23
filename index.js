var scraperjs = require('scraperjs'),
    router = new scraperjs.Router(),
    url = 'https://github.com/',
    users = ['codyss', 'apackin', 'jmeeke02'];


var sjs = require('scraperjs/src/Scraper');

users.forEach(function (user) {
    sjs.StaticScraper
        .create('https://github.com/'+user)
        .scrape(function($) {
            return $('.contrib-number').map(function() {
                return $(this).text();
            }).get()
        })
        .then(function(news) {
            // news.forEach(function(elm) {
                console.log(user);
                console.log(news);
            // });
        });
})