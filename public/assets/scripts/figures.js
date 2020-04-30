var triangle_id_num = 0;
var circle_id_num = 0;
var square_id_num = 0;
var octagon_id_num = 0;

function MakeTriangle()
{
    var div = document.createElement('div');    
    div.style.height = "0";
    div.style.width = "0";
    div.style.borderLeft= "25px solid transparent";
    div.style.borderRight= "25px solid transparent";
    div.style.borderBottom= "50px solid green";

    div.id = "triangle_" + triangle_id_num;
    triangle_id_num++;
    console.log(div.id);

    document.getElementById("board").appendChild(div); 

}

function MakeCircle()
{
    var div = document.createElement('div');
    div.style.height= "50px";
    div.style.width= "50px";
    div.style.background= "red";
    div.style.borderRadius= "50%";
    div.style.align= "center";

    div.id = "circle_" + circle_id_num;
    circle_id_num++;
    console.log(div.id);
    
    document.getElementById("board").appendChild(div); 
}

function MakeSquare()
{
    var div = document.createElement('div');
    div.style.height= "50px";
    div.style.width= "50px";
    div.style.background= "blue";
    div.style.align= "center";
    
    div.id = "square_" + square_id_num;
    square_id_num++;
    console.log(div.id);
    
    document.getElementById("board").appendChild(div); 
}

function MakeOctagon()
{
    var div = document.createElement('div');
    div.className = "octagon";

    div.id = "octagon_" + octagon_id_num;
    octagon_id_num++;
    console.log(div.id);
    
    document.getElementById("board").appendChild(div); 
}