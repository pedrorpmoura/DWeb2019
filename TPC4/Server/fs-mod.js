var fs = require('fs')

exports.loadFile = function(response, file_path, text_type) {

    fs.readFile(file_path, function (err, data) {
        if (err) {
            response.writeHead(200, {'Content-Type': 'text/html'})
            return response.end("File not found!")
        }

        response.writeHead(200, {'Content-Type': text_type})
        response.write(data)
        response.end()
    })
}