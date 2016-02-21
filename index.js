var scraperjs = require('scraperjs'),
    router = new scraperjs.Router(),
    url = 'https://github.com/codyss';

router
    .otherwise(function(url) {
    console.log("Url '"+url+"' couldn't be routed.");
});

var path = {};

router.on(url)
    .createStatic()
    .scrape(function($) {
        return $('.contrib-number').map(function() {
            console.log($(this).text());
        
        }).get();
    })
    .then(function(links, utils) {
        path[utils.params.id] = links
    })

// router.route(url, function() {
//     console.log("i'm done");
// });