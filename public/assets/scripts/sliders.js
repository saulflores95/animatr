var currentFig;

//Colors
let bgColor = document.querySelector('#color1');
let bgHex = document.querySelector('#hex1');  

bgColor.addEventListener("input", updateBackgroundColor, false);
bgColor.addEventListener("change", updateBackgroundColor, false);
bgColor.select();

function updateBackgroundColor(event) {
   bgHex.value  = event.target.value;
}

//Sliders
function setFigure(id) {
   if(id!==null) {
      currentFig = document.getElementById(id);
   }
}

function rangeSlider(value) {
   document.getElementById('rangeSlider').innerHTML=value;
   document.getElementById('rangeHeight').value=value;
   setStyleOn("height", value);
}

function rangeSlider2(value) {
   document.getElementById('rangeSlider2').innerHTML=value;
   document.getElementById('rangeWidth').value=value;
   setStyleOn("width", value);
}

function setStyleOn(rule, value) {
   x = currentFig;
   x.style[rule] = value;
}

function borderSelect() {
   while(0);
}

function zindexChange() {
   zinput = document.getElementById("zin");
   setStyleOn("z-index", zinput.value);
}
