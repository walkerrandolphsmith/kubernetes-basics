var express = require("express");
var redis = require("redis");

var app = express();

function createClient(host) {
  return redis.createClient({
    host: host,
    port: 6379,
    scheme: "tcp"
  });
}

app.use(express.static("static"));

app.get("/api/instance", (request, response) => {
  response.status(200).send({ instance: process.env.MY_POD_NAME });
});

app.get("/api", (request, response) => {
  var cmd = request.query.cmd;
  var key = request.query.key;
  var value = request.query.value;

  response.append("Content-Type", "application/json");

  if (cmd === "set") {
    var client = createClient("redis-master");
    client.set(key, value);
    response.status(200).send({ Updated: true });
  } else {
    var client = createClient("redis-slave");
    client.get(key, function(err, reply) {
      if (err) response.status(500).send({ error: "Error" });
      else response.status(200).send(reply);
    });
  }
});

function onReady() {
  console.log("🚀 Ready to receive requests");
}

app.listen({ port: 80 }, onReady);
