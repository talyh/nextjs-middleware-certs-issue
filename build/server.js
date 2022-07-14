/* eslint-disable no-console */
const https = require("https");
const next = require("next");
const createCertificate = require("./createCertificate");

const port = parseInt(process.env.PORT, 10) || 3000;
const hostname = process.env.HOSTNAME || "dev.mycustomdomain.com";

const nextApp = next({ dev: true });
const nextHandler = nextApp.getRequestHandler();

async function run() {
  await nextApp.prepare();
  const pems = createCertificate();
  https
    .createServer({ key: pems.private, cert: pems.cert }, nextHandler)
    .listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready at https://${hostname}:${port}`);
    });
}

run();
