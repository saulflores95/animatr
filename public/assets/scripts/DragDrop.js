var board = document.getElementById("board");
var Triangle = document.getElementById("TriangleItem");
var Circle = document.getElementById("CircleItem");
var Square = document.getElementById("SquareItem");
var Octagon = document.getElementById("OctagonItem");
var i = 0;
var flag = false;

board.ondrop = function(e) {
    e.preventDefault();
    var div = null;
    switch(e.dataTransfer.getData("text")) {
        case "TriangleItem":
            spawnTriangle(triangle_id_num);
            triangle_id_num++
            break;
        case "CircleItem":
            spawnCircle(circle_id_num);
            circle_id_num++;
            break;
        case "SquareItem":
            spawnSquare(square_id_num);
            square_id_num++;
            break;
        case "OctagonItem":
            spawnOctagon(octagon_id_num);
            octagon_id_num++;
            break
        default:
            break;
    }

    function spawnDiv(type, num) {
        div.style.position = "absolute";
        div.style.top = (e.clientY - board.offsetTop - 25) + "px";
        div.style.left = (e.clientX - board.offsetLeft - 25) + "px";
        div.id = type + num;
        i++;
        board.appendChild(div);
        dragElement(document.getElementById(div.id));
    }

    function spawnTriangle(idnum) {
        div = document.createElement('div');
        div.style.height = "0";
        div.style.width = "0";
        div.style.borderLeft= "25px solid transparent";
        div.style.borderRight= "25px solid transparent";
        div.style.borderBottom= "50px solid green";
        spawnDiv("triangle_", idnum);
    }

    function spawnCircle(idnum) {
        div = document.createElement('div');
        div.style.height= "50px";
        div.style.width= "50px";
        div.style.background= "red";
        div.style.borderRadius= "50%";
        div.style.align= "center";

        spawnDiv("circle_", idnum);
    }

    function spawnSquare(idnum) {
        div = document.createElement('div');
        div.style.height= "50px";
        div.style.width= "50px";
        div.style.background= "blue";
        div.style.align= "center";

        spawnDiv("square_", idnum);
    }

    function spawnOctagon(idnum) {
        div = document.createElement('div');
        div.className = "octagon";
        
        spawnDiv("octagon_", idnum);
    }
}

board.ondragover = function(e) {
    e.preventDefault();
}

Triangle.ondragstart = dragStart;
Circle.ondragstart = dragStart;
Square.ondragstart = dragStart;
Octagon.ondragstart = dragStart;

function dragStart(e) {
    e.dataTransfer.setData("text", e.target.id);
}


//https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}