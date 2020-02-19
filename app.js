const http = require('http');
const crypto = require('crypto');

const PORT = process.env.PORT || 5000


http.createServer((request, response) => {
  let body = [];
  request.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();

    const appSecret = "dfc56f62-8629-464e-a27a-78ac540c9a2f";
    const httpMethod = "POST";
    const URI = "localhost:8080";

    const concatedValue = appSecret + httpMethod + URI + body

    const hash = crypto.createHash('sha256').update(concatedValue).digest('hex');

    console.log(body);

    response.end(hash);
  });

}).listen(PORT);
