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

    console.log(body);

    response.end(hash);
  });

}).listen(PORT);
