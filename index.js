"use strict";
const PORT = 3112;

const fastify = require("fastify")({
  logger: {
    level: "info",
    prettyPrint: true
  }
});

fastify.get("/health", (req, res) => {
  res.send({
    status: "all ok buddy!"
  });
});

fastify.listen(PORT, err => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
