const grid = document.querySelector('table');
const button = document.querySelector('[type=submit]');
button.addEventListener('click', submitClick);
grid.addEventListener('mousedown', whichMouseButton, true);
grid.addEventListener('mouseup', noColor, true);
var firstSubmit = false;

function makeGrid() {
    var height = document.querySelector('#inputHeight').value;
    var width = document.querySelector('#inputWidth').value;

    for (var i = 1; i <= height; i++) {
        var tr = document.createElement('tr');
        grid.appendChild(tr);
        for (var j = 1; j <= width; j++) {
            var td = document.createElement('td');
            tr.appendChild(td);
        }
    }
}

function submitClick(a) {
    // don't reload page
    a.preventDefault();
    // clear existing table
    if (firstSubmit) {
        clearTable();
    }
    firstSubmit = true;
    // make a new grid
    makeGrid();
}

function yesColor(a) {
    changeColor(a);
    grid.addEventListener('mouseover', changeColor);
}

function changeColor(a) {
    var color = document.querySelector('#colorPicker').value;
    if (a.target.nodeName === 'TD') {
        a.target.style.background = color;
    };
}

function noColor() {
    grid.removeEventListener('mouseover', changeColor);
}

function clearTable() {
    while (grid.firstChild) {
        grid.firstChild.remove();
    }
}

function erase(a) {
    if (a.target.nodeName === 'TD') {
        a.target.style.removeProperty("background-color");
    };
}

function whichMouseButton(a) {
    var mouseButton = a.button;
    if (mouseButton === 0) {
        yesColor(a);
    } else if (mouseButton === 2) {
        //don't open context menu
        grid.oncontextmenu = function () {
            return false;
        }
        erase(a);
    }
}
