
/*
 * GET home page.
 */

if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var redis = require("redis").createClient(rtg.port, rtg.hostname);

    redis.client.auth(rtg.auth.split(":")[1]);
} else {
    var redis = require("redis").createClient();
}

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};