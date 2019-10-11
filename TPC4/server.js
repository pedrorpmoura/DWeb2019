var http = require('http')
var url = require('url')
var fs = require('fs')

var server = http.createServer(function (request, response) {

    var parsed_url = url.parse(request.url, true)
    var path = parsed_url.pathname
    //console.log("Requested path: " + path)
    
    switch (path) {
        
        // request for the page icon
        // if not responded, browser sets a default icon
        case "/favicon.ico":
            break
        
        // request for the stylesheet
        case "/arq2html.xsl":
            
            fs.readFile("arq2html.xsl", function (err, data) {
                if (err) {
                    response.writeHead(200, {'Content-Type': 'text/html'})
                    return response.end("Can't load the file. Stylesheet not found.")
                }

                response.writeHead(200, {'Content-Type': 'text/xsl'})
                response.write(data)
                response.end()
            })
            break
            
        default :

            let arq_number = path.substring(1)
            let filepath = "dataset/arq" + arq_number + ".xml"

            fs.readFile(filepath, function (err, data) {
                if (err) {
                    response.writeHead(200, {'Content-Type': 'text/html'})
                    return response.end("Error: file doesn't exist.")
                }

                response.writeHead(200, {'Content-Type': 'text/xml'})
                response.write(data)
                response.end()
            })
            break
    }
})

server.listen(7777)
console.log("Server is listening on port 7777...")