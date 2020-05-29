import { dragElement } from './utils.js';

var board = document.getElementById("board");

var Triangle = document.getElementById("TriangleItem");
var Circle = document.getElementById("CircleItem");
var Square = document.getElementById("SquareItem");
var Octagon = document.getElementById("OctagonItem");

let amount_of_figures = 0;

class Figura {
    constructor(type, x, y, animation) {
      this.type = type;
      this.cordinates = {
          x,
          y,
      },
      this.animation = {
          time: animation.time, //2s
          type: animation.type, //fade
          property: animation.property //heigt
      }
      this.div;
    }

    createForm() {
        this.div = document.createElement('div');
        this.div.className = this.type;
        this.div.addEventListener ("click", loadProperties, false);
        this.div.style.zIndex = 0;
        this.div.id = amount_of_figures.toString();
        amount_of_figures++;
        dragElement(this.div);
        board.appendChild(this.div);
        loadProps(this.div);
    }
}

function dragStart(e) {
    console.log("e.target.id: ", e.target.id);
    e.dataTransfer.setData("text", e.target.id);
}

function loadProperties() {
    loadProps(this);
}

board.ondrop = function(e) {
    e.preventDefault();
    var div = null;
    switch(e.dataTransfer.getData("text")) {
        case "TriangleItem":
            spawnDiv("triangle");
            break;
        case "CircleItem":
            spawnDiv("circle");
            break;
        case "SquareItem":
            spawnDiv("square");
            break;
        case "OctagonItem":
            spawnDiv("octagon");
            break
        default:
            break;
    }

    function spawnDiv(Fig_name) {
        var fig = new Figura(Fig_name, 1, 3, {});
        fig.createForm();

        fig.div.style.position = "absolute";
        fig.div.style.top = (e.clientY - board.offsetTop - 25) + "px";
        fig.div.style.left = (e.clientX - board.offsetLeft - 25) + "px";

        //board.appendChild(fig.div);
        //dragElement(fig.div);
    }
}

board.ondragover = function(e) {
    e.preventDefault();
}

window.spawnFigure = (Fig_name) =>
{
    var fig = new Figura(Fig_name, 1, 3, {});
    fig.createForm();

    //dragElement(fig.div);
    //board.appendChild(fig.div);

}

Triangle.ondragstart = dragStart;
Circle.ondragstart = dragStart;
Square.ondragstart = dragStart;
Octagon.ondragstart = dragStart;