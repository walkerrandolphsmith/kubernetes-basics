var express = require("express");
var redis = require("redis");

var app = express();

app.use(express.static("static"));

app.get("/api/instance", (request, response) => {
  response.status(200).send({ instance: process.env.MY_POD_NAME });
});

app.get("/api", (request, response) => {
  var cmd = request.query.cmd;
  var key = request.query.key;
  var value = request.query.value;

  response.append("Content-Type", "application/json");

  function handleResponse(err, reply) {
    if (err) response.status(500).send({ error: "Error" });
    else response.status(200).send({ reply: reply });
  }

  var config =
    cmd === "set"
      ? {
          host: "redis-master",
          method: "lpush",
          args: [key, value, handleResponse]
        }
      : {
          host: "redis-slave",
          method: "lrange",
          args: [key, 0, 100, handleResponse]
        };

  var client = redis.createClient({
    host: config.host,
    port: 6379,
    scheme: "tcp"
  });

  client.on("error", function(err) {
    response.status(500).send({ error: "Error with connection" });
  });

  client[config.method](...config.args);
});

function onReady() {
  console.log("🚀 Ready to receive requests");
}

app.listen({ port: 80 }, onReady);
