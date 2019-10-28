var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');

var {parse} = require('querystring')

var songsDB = __dirname + '/../databases/songs.json'


/* GET home page. */
router.get('/', function (req, res, next) {
    
    jsonfile.readFile(songsDB, (error, data) => {
        if (error) {
            //console.log(error)
            res.render('error', { e: 'Erro na leitura da base de dados.'})

        } else {
            let docs = data.arq['doc']
            res.render('index', { docs: docs })
        }
    })
})

router.get('/song-:id(\\d+)/', function (req, res, next) {

    var id = req.params.id
    // check if id is a number
    if (isNaN(id)) {
        res.render('error', { e: 'Erro no request GET: id não reconhecido'})

    } else {
        
        jsonfile.readFile(songsDB, (error, data) => {
            if (error) {
                //console.log(error)
                res.render('error', { e: 'Erro na leitura da base de dados.'})
            } else {

                var docs = data.arq['doc']

                if (id >= docs.length) {
                    res.render('error', { e: 'Música não existente'})
                } else {
                    // transform object in array
                    res.render('song-page', { song : docs[id] })
                }
            }
        })
    }
})

/* POST song. */
router.post('/add-song', function (req, res) {
    var obj = req.body
    
    // handle the file key
    let file_type = obj['file_type']
    delete obj['file_type']

    let file_name = obj['file_name']
    delete obj['file_name']

    obj['file'] = {}
    obj.file['-t'] = file_type
    obj.file['#text'] = file_name


    jsonfile.readFile(songsDB, (error, data) => {
        if (error) {
            //console.log(error)
            res.render('error', { e: 'Erro na leitura da base de dados.'})

        } else {
            data.arq.doc.push(obj)
            jsonfile.writeFile(songsDB, data, error => {
                if (error) {
                    console.log(error)
                } else {
                    console.log("Música registada com sucesso!")
                }
            })
        }

        res.redirect('/')
    })
})

/* DELETE song */
router.post('/delete-:id', function (req, res) {

    var id = req.params.id
    // check if id is a number
    if (isNaN(id)) {
        res.render('error', { e: 'Erro no request POST'})

    } else {
        
        jsonfile.readFile(songsDB, (error, data) => {
            if (error) {
                //console.log(error)
                res.render('error', { e: 'Erro na leitura da base de dados.'})
    
            } else {
                // delete element
                data.arq['doc'].splice(id, 1)   
                jsonfile.writeFile(songsDB, data, error => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log("Música " + id + " apagada com sucesso!")
                    }
                })
            }

            res.redirect('/')
        })
    }
})


/* UPDATE SONG */
router.post("/update-:id", function (req, res) {
    
    var id = req.params.id

    var obj = req.body
    var key = Object.keys(obj)[0]
    var value = obj[key]

    if (isNaN(id)) {
        res.render('error', { e: 'Erro no request POST'})

    } else {
        jsonfile.readFile(songsDB, (error, data) => {
            if (error) {
                //console.log(error)
                res.render('error', { e: 'Erro na leitura da base de dados.'})
    
            } else {
                if (key == 'file') {
                    data.arq.doc[id][key]['#text'] = value
                }
                else {
                    data.arq.doc[id][key] = value
                }
                
                jsonfile.writeFile(songsDB, data, error => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log("Música atualizada com sucesso!")
                    }
                })
            }

            res.redirect('/')
        })   
    }
})

module.exports = router;
