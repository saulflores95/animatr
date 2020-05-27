import { dragElement } from './utils.js';

var board = document.getElementById("board");
var triangle_id_num = 0;
var circle_id_num = 0;
var square_id_num = 0;
var octagon_id_num = 0;

var Triangle = document.getElementById("TriangleItem");
var Circle = document.getElementById("CircleItem");
var Square = document.getElementById("SquareItem");
var Octagon = document.getElementById("OctagonItem");

var i = 0;
var flag = false;

function dragStart(e) {
    e.dataTransfer.setData("text", e.target.id);
}

Triangle.ondragstart = dragStart;
Circle.ondragstart = dragStart;
Square.ondragstart = dragStart;
Octagon.ondragstart = dragStart;

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

    function loadProperties() {
        setFigure(this.id);
        document.getElementById("zin").value = div.style.zIndex;
        rangeSlider((this.style.height).replace("px",""));
        rangeSlider2((this.style.width).replace("px",""));
        console.log(this);
    }

    function loadPropertiesByDiv(div) {
        setFigure(div.id);
        rangeSlider((div.style.height).replace("px",""));
        rangeSlider2((div.style.width).replace("px",""));
        document.getElementById("zin").value = div.style.zIndex;
    }

    function spawnDiv(type, num) {
        div.addEventListener ("click", loadProperties, false);
        div.style.position = "absolute";
        div.style.top = (e.clientY - board.offsetTop - 25) + "px";
        div.style.left = (e.clientX - board.offsetLeft - 25) + "px";
        div.style.zIndex = 0;
        div.id = type + num;
        i++;
        board.appendChild(div);
        dragElement(document.getElementById(div.id));
        loadPropertiesByDiv(div);
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

window.MakeTriangle = () => {
    var div = document.createElement('div');    
    div.style.height = "0";
    div.style.width = "0";
    div.style.borderLeft= "25px solid transparent";
    div.style.borderRight= "25px solid transparent";
    div.style.borderBottom= "50px solid green";
    div.style.position = "absolute";

    div.id = "triangle_" + triangle_id_num;
    triangle_id_num++;
    dragElement(div);
    document.getElementById("board").appendChild(div); 

}

window.MakeCircle = () => {
    var div = document.createElement('div');
    div.style.height= "50px";
    div.style.width= "50px";
    div.style.background= "red";
    div.style.borderRadius= "50%";
    div.style.align= "center";
    div.style.position = "absolute";

    div.id = "circle_" + circle_id_num;
    circle_id_num++;
    dragElement(div);
    document.getElementById("board").appendChild(div); 
}

window.MakeSquare = () => {
    var div = document.createElement('div');
    div.style.height= "50px";
    div.style.width= "50px";
    div.style.background= "blue";
    div.style.align= "center";
    div.style.position = "absolute";

    div.id = "square_" + square_id_num;
    square_id_num++;
    dragElement(div);
    document.getElementById("board").appendChild(div); 
}

window.MakeOctagon = () =>{
    var div = document.createElement('div');
    div.className = "octagon";
    div.style.position = "absolute";
    div.id = "octagon_" + octagon_id_num;
    octagon_id_num++;
    dragElement(div);
    document.getElementById("board").appendChild(div); 
}

