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
function rangeSlider(value) {
   document.getElementById('rangeSlider').innerHTML=value;
}
function rangeSlider2(value) {
   document.getElementById('rangeSlider2').innerHTML=value;
}