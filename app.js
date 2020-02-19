const http = require('http');
const crypto = require('crypto');

const PORT = process.env.PORT || 5000


http.createServer((request, response) => {
  let body = [];
  request.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();

    const appSecret = process.env.APP_SECRET;
    const httpMethod = "POST";
    const URI = process.env.URL;

    const concatedValue = appSecret + httpMethod + URI + body

    const hash = crypto.createHash('sha256').update(concatedValue).digest('hex');
    const actualHash = request.headers["x-hubspot-signature"] || "none received";

    console.log("Expected Signature: " + hash);
    console.log("Actual Signature: " + actualHash);

    response.write(hash);
    response.write("\n");
    response.write(actualHash);

    response.end();
  });

}).listen(PORT);
