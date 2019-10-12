var http = require('http')
var url = require('url')
var fs_mod = require('./fs-mod')

var server = http.createServer(function (request, response) {

    var path = url.parse(request.url, true).path
    //console.log(url.parse(request.url, true))

    switch (path) {

        case "/":
            fs_mod.loadFile(response, 'Arq/index.html', 'text/html')
            break

        case "/favicon.ico":
            break

        case "/arq2html.xsl":
            fs_mod.loadFile(response, 'Arq/arq2html.xsl', 'text/xsl')
            break

        default:

            let arq_id = path.substring(1)
            
            var filepath = "Arq/dataset/arq" + arq_id + ".xml"

            fs_mod.loadFile(response, filepath, 'text/xml')
            break
    }
})


var port = 7777
server.listen(port)
console.log("Server is listening on port " + port)