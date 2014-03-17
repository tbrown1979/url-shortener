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

exports.shorten = function(req, res){
  console.log(JSON.stringify(req));
  client.incr("uniqueid", function (err, reply) {
    if (err) {
      res.json(statusResponse(status, err));
    } else {
      client.get("uniqueid", function (err, reply) {
        if (err) {
          res.json(statusResponse(status, err));
        } else {
          //may have to check that reply != null
          var short_url = make_short_url(reply);
        }
      }
    }
  });

function make_short_url(unique_id) {
  var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var convert_unique_id = 
    function convert_base_ten_num(num, base) {
      var digits = [];
      while (num > 0) {
        var remainder = num % base;
        digits.push(remainder);
        num = Math.floor(num / base);
      };
      digits.reverse();
      return digits;
    };
  var letters_by_index = convert_unique_id(unique_id, alphabet.length);
  var short_url = "";
  for (var i=0; i < letters_by_index.length; i++) {
    short_url += alphabet[letters_by_index[i]];
  }
  return short_url;
};



// alert(bijective(125));
// exports.shorten = function(req, res){
//   console.log(JSON.stringify(req));
//   client.get(accessedUrl,
//     function(err, reply) { 
//       if (err) { 
//         res.json(statusResponse("failed", err)); 
//       } else {
//         if (reply === null) {
//           res.json(statusResponse("success", "need to actually do stuff"));
//         } else {
//           res.json(statusResponse("success", reply));
//         }
//       }
//     }
//   );
// };