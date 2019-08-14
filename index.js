"use strict";
const PORT = 3112;
const FILE_OUTPUT = "/tmp/resized_picture.jpg";
const FILE_RESULT = "public/result.jpg";

const path = require("path");
const fs = require("fs");
const child_process = require("child_process");

const pump = require("pump");
const fastifyMultipart = require("fastify-multipart");
const fastifyStatic = require("fastify-static");
const fastify = require("fastify")({
  logger: {
    level: "info",
    prettyPrint: true
  }
});

function uploadFileHandler(field, file, filename, encoding, mimetype) {
  fs.unlink(FILE_OUTPUT, () => {
    pump(file, fs.createWriteStream(FILE_OUTPUT));
  });
}

fastify.post("/upload", (req, res) => {
  req.multipart(uploadFileHandler, err => {
    if (err) {
      fastify.log.error(err);
    }

    fastify.log.info("upload completed");
    fastify.log.info("commencing image resizing");

    child_process.execFile(
      "/usr/bin/convert",
      [FILE_OUTPUT, "-resize", "280x150", FILE_RESULT],
      () => {
        res.redirect("/result.html");
      }
    );
  });
});

fastify.register(fastifyMultipart);

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public")
});

fastify.listen(PORT, "0.0.0.0", err => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
