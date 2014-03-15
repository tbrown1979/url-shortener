
/*
 * GET home page.
 */

if (process.env.REDISTOGO_URL) {
  console.log("cloud")
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var client = require("redis").createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
} else {
  console.log("local")
  var client = require("redis").createClient();
}

function statusResponse(status, msg) {
  return { "status" : status, "message" : msg }
}

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.test = function(req, res){
  var accessedUrl = req.params.test;
  console.log(accessedUrl);
  client.get(accessedUrl,
    function(err, reply) { 
      if (err) { 
        res.json(statusResponse("failed", err)); 
      } else {
        if (reply === null) {
          res.json(statusResponse("success", "need to actually do stuff"));
        } else {
          res.json(statusResponse("success", reply));
        }
      }
    }
  );

}

