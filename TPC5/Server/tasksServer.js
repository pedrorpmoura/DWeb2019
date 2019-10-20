var http = require('http')
var url = require('url')
var pug = require('pug')
var fs = require('fs')
var jsonfile = require('jsonfile')
var {parse} = require('querystring')

var tasksDB = "databases/tasks.json"

var server = http.createServer((request, response) => {

    var parsed_url = url.parse(request.url, true)
    var pathname = parsed_url.pathname

    console.log(request.method + ' ' + pathname)

    switch (request.method) {
        case 'GET':
            if (pathname == '/' || pathname == '/taskManager') {
                loadIndexPage(response)

            } else if (pathname == '/favicon.ico') {
                // se o browser não tiver uma resposta, coloca um ícone default

            } else if (pathname == '/w3.css') {
                loadStylesheet(response, 'stylesheets/w3.css')
            
            } else if (pathname == '/completed') {
                loadCompletedPage(response)

            } else if (pathname == '/uncompleted') {
                loadUncompletedPage(response)

            } else if (pathname == '/edit') {
                loadEditPage(response)

            } else {
                loadErrorPage(response, "GET desconhecido")
            }
            break
        
        case 'POST':
            if (pathname == '/addTask') {
                updateTasks(request)

            } else if (pathname.startsWith('/check')) {
                var task_id = parseInt(pathname.substring(6))

                checkTask(task_id)

            } else if (pathname.startsWith('/uncheck')) {
                var task_id = parseInt(pathname.substring(8))
                
                uncheckTask(task_id)

            } else if (pathname == '/delete') {
                deleteTasks()

            } else {
                loadErrorPage(response, "POST desconhecido")
            }
            break
        
        default:
            loadErrorPage(response, 'ERRO: ' + request.method + ' não suportado...')
            break
    }
})


var port = 12345
server.listen(port, () => {
    console.log('Server listening on port ' + port + '...')
})



// functions
function loadIndexPage(response) {

    response.writeHead(200, {
        'Content-Type': 'text/html; charset-utf-8'
    })

    jsonfile.readFile(tasksDB, (error, data) => {
        if (error) {
            response.write('<h1>ERROR</h1>')
        } else {
            response.write(pug.renderFile('pug-layouts/index.pug', {tasks : data}))
        }

        response.end()
    })
}

function loadStylesheet(response, path) {
    response.writeHead(200, {
        'Content-Type': 'text/css; charset-utf-8'
    })

    fs.readFile(path, (error, data) => {
        if (error) {
            response.write('<p>Erro: ' + error + '</p>')
        } else {
            response.write(data)
        }

        response.end()
    })
}


function loadErrorPage(response, error_msg) {
    response.writeHead(200, {
        'Content-Type' : 'text/html; charset=utf-8'
    })

    response.write(pug.renderFile('pug-layouts/error.pug', {e: error_msg}))
    response.end()
}

function loadCompletedPage(response) {

    response.writeHead(200, {
        'Content-Type': 'text/html; charset-utf-8'
    })

    jsonfile.readFile(tasksDB, (error, data) => {
        var completed = data.filter(d => d['is_done'] == true)
        if (error) {
            response.write('<h1>ERROR</h1>')
        } else {
            response.write(pug.renderFile('pug-layouts/completed.pug', {tasks : completed}))
        }

        response.end()
    })
}

function loadUncompletedPage(response) {
    response.writeHead(200, {
        'Content-Type': 'text/html; charset-utf-8'
    })

    jsonfile.readFile(tasksDB, (error, data) => {
        var uncompleted = data.filter(d => d['is_done'] == false)
        if (error) {
            response.write('<h1>ERROR</h1>')
        } else {
            response.write(pug.renderFile('pug-layouts/uncompleted.pug', {tasks : uncompleted}))
        }

        response.end()
    })
}

function loadEditPage(response) {

    response.writeHead(200, {
        'Content-Type': 'text/html; charset-utf-8'
    })

    jsonfile.readFile(tasksDB, (error, data) => {
        if (error) {
            response.write('<h1>ERROR</h1>')
        } else {
            response.write(pug.renderFile('pug-layouts/edit.pug', {tasks : data}))
        }

        response.end()
    })
}

function updateTasks(request) {
    recoverInfo(request, result => {
        jsonfile.readFile(tasksDB, (error, data) => {
            if(!error) {
                data.push(result)
                jsonfile.writeFile(tasksDB, data, error => {
                    if(error) {
                        console.log(error)
                    } else {
                        console.log('Tarefa submetida com sucesso')
                    }
                })
            }
        })
    })
}

function recoverInfo(request, callback) {
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded') {
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })

        request.on('end', () => {
            var obj = parse(body)
            obj['is_done'] = false
            callback(obj)
        })
    }
}


function uncheckTask(id) {
    jsonfile.readFile(tasksDB, (error, data) => {
        if(!error) {
            data[id]['is_done'] = false
            jsonfile.writeFile(tasksDB, data, error => {
                if(error) {
                    console.log(error)
                } else {
                    console.log('Tarefa unchecked com sucesso')
                }
            })
        }
    })
}


function checkTask(id) {
    jsonfile.readFile(tasksDB, (error, data) => {
        if(!error) {
            data[id]['is_done'] = true
            jsonfile.writeFile(tasksDB, data, error => {
                if(error) {
                    console.log(error)
                } else {
                    console.log('Tarefa checked com sucesso')
                }
            })
        }
    })
}

function deleteTasks() {
    jsonfile.readFile(tasksDB, (error, data) => {
        if(!error) {
            var new_data = data.filter(task => task['is_done'] == false)
            jsonfile.writeFile(tasksDB, new_data, error => {
                if(error) {
                    console.log(error)
                } else {
                    console.log('Tarefas apagadas com sucesso.')
                }
            })
        }
    })
}