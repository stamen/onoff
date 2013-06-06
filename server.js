"use strict";

var express = require("express"),
    request = require("request"),
    app = express();

app.set("view engine", "ejs");

app.use(express.basicAuth(function(user, pass) {
  return process.env.USERNAME === user && process.env.PASSWORD === pass;
}));

app.use(express.bodyParser());
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.render("index", {
    app: process.env.APP,
    url: process.env.S3_URL
  });
});

app.post("/onoff", function(req, res) {
  var status = req.body.on === "on" ? "on" : "off";

  var doc = JSON.stringify({
    status: status
  });

  request.put({
    url: process.env.S3_URL,
    aws: {
      key: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY
    },
    headers: {
      "x-amz-acl": "public-read"
    },
    json: {
      status: status
    }
  }, function(err, rsp) {
    if (err) {
      res.send(500);
      return;
    }

    res.send("The service is now " + status);
  });
});

app.listen(process.env.PORT || 8080, function() {
  console.log("Listening at http://%s:%d/", this.address().address, this.address().port);
});
