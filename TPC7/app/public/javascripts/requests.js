function editaItem(id)
{
    console.log('Vou tentar editar o ' + id + '...');
    axios.get('/edit-item/' + id)
        .then(response => fillModal(response.data))
        .catch(error => console.log(error));
}

function fillModal(response)
{
    document.getElementsByTagName("html")[0].innerHTML = response;
}

function sendEditarItem(id)
{
    console.log('Enviar informação para alteração do arquivo');
    var formElement = document.getElementById('form');

    const formData = new FormData(formElement);
    const formEntries = formData.entries();
    const json = Object.assign(...Array.from(formEntries, ([x,y]) => ({[x]:y})));
    axios.put('/movies/' + id, json).then(_ => window.location.assign('/movies'));
    return false;
}

function apagaItem(id)
{
    console.log('Vou tentar apagar o ' + id + '...');
    axios.delete('/movies/' + id)
        .then(response => window.location.assign('/movies'))
        .catch(error => console.log(error));
}
