"use strict";
const PORT = 3112;

const path = require("path");
const fastifyStatic = require("fastify-static");
const fastify = require("fastify")({
  logger: {
    level: "info",
    prettyPrint: true
  }
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public")
});

fastify.listen(PORT, err => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
