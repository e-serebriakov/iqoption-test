const nodeStatic = require('node-static');
const file = new nodeStatic.Server('./');

require('http').createServer((request, response) => {
  request.addListener('end', () => {
    file.serve(request, response);
  }).resume();
}).listen(8080, () => {
  console.log('Server is listening to port 8080!\n');
});
