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
        this.div.style.zIndex = 0;
        this.div.id = amount_of_figures.toString();
        amount_of_figures++;

        switch(this.type) {
            case "triangle": 
                this.div.style.width = "0";
                this.div.style.borderLeft= "25px solid transparent";
                this.div.style.borderRight= "25px solid transparent";
                this.div.style.borderBottom= "50px solid green";
                this.div.style.borderBottom= "50px solid #00FF00";
                break;
            case "square":
                this.div.style.height= "50px";
                this.div.style.width= "50px";
                this.div.style.background= "red";
                this.div.style.background= "#ff0000";
                this.div.style.borderRadius= "50%";
                this.div.style.border = "0px solid #000000";
                this.div.style.align= "center";
                break;
            case "circle": 
                this.div.style.height= "50px";
                this.div.style.width= "50px";
                this.div.style.background= "blue";
                this.div.style.background= "#0000ff";
                this.div.style.border = "0px solid #000000";
                this.div.style.align= "center";
                break;
            case "octagon": 
                 
                break;
        }

        dragElement(this.div);
        board.appendChild(this.div);
        
        this.div.addEventListener("click",loadProperties);
        loadProperties(this.div);
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
        console.log("no entiendo");

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