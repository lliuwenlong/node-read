var http=require('http');
var fs=require('fs');
var url = require("url");
var querystring = require("querystring")
// var mime=require('mime');
var cache={};


var server=http.createServer(function(request, response){
    const arg = url.parse(request.url).query;
    const params = querystring.parse(arg);
    const filename = params.filename;
    try {
        const filePath = './public/uploadVdeio/' + filename;
        response.writeHead(200, {'Content-Type': 'video/mp4'});
        fs.createReadStream(filePath).pipe(response);
    } catch (e) {

    }
    
}
);

server.listen(3000,function(){
    console.log('Server is listenning on port 3000.');
});