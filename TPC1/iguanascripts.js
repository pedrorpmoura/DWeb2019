// carrossel de imagens
var index = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("slides");

    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    index++;
    if(index > x.length) {
        index = 1;
    }
    x[index-1].style.display = "block";
    setTimeout(carousel, 5000);
}



// species tab
function load_verde() {
    var x = document.getElementById("verde");
    var y = document.getElementById("caraibas");

    y.style.display = "none";
    x.style.display = "block";
}

function load_caraibas() {
    var x = document.getElementById("verde");
    var y = document.getElementById("caraibas");

    x.style.display = "none";
    y.style.display = "block";
}
