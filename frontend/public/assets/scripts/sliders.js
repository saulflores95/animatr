var currentFig;
var figObj;

function setFigure(id) {
   if (id !== null) {
      currentFig = document.getElementById(id);
   }
}

function setStyleOn(rule, value) {
   x = currentFig;
   x.style[rule] = value;
}

function getBorderArray(div) {
   let border = div.style.border;
   border = border.split(" ");
   return border;
}

function rgbToNum(rgb) {
   rgb = rgb.replace("rgb(", "");
   rgb = rgb.replace(")", "");
   return rgb.split(',');
}

function componentToHex(x) {
   x = parseInt(x).toString(16);      //Convert to a base16 string
   return (x.length==1) ? "0"+x : x;
}

function heightSlider(value) {
   try {
      document.getElementById('rangeSlider').innerHTML = value;
      document.getElementById('rangeHeight').value = value;

      if (currentFig.classList.contains("triangle")) {

         let borderArray = currentFig.style.borderBottom.split(' ');
         let newBorderBottom = value + "px " + borderArray[1] + " " + borderArray[2] + borderArray[3] + borderArray[4];
         currentFig.style.borderBottom = newBorderBottom;

      } else {
         setStyleOn("height", value);
      }
   } catch (error) {}
}

function widthSlider(value) {
   try {
      document.getElementById('rangeSlider2').innerHTML = value;
      document.getElementById('rangeWidth').value = value;
      
      if (currentFig.classList.contains("triangle")) {
         let newBorderSides;
         let borderArray = currentFig.style.borderLeft.split(' ');

         if (currentFig.style.borderLeft.includes("transparent"))
            newBorderSides = (value / 2).toString() + "px " + borderArray[1] + " " + borderArray[2]
         else
            newBorderSides = (value / 2).toString() + "px " + borderArray[1] + " " + borderArray[2] + borderArray[3] + borderArray[4];

         currentFig.style.borderLeft = newBorderSides;
         currentFig.style.borderRight = newBorderSides;
      } else if (currentFig.classList.contains("octagon")) {
         setStyleOn("width", value);
      } else {
         setStyleOn("width", value);
      }
   } catch (error) {}
}


function borderStyleChange() {
   try {
      if (currentFig.classList.contains("triangle") || currentFig.classList.contains("octagon")) {} else {
         let newBorder = document.getElementById('borderStyle').value;
         let currentBorder = getBorderArray(currentFig);
         currentFig.style.border = currentBorder[0] + " " + newBorder + " " + currentBorder[2] + currentBorder[3] + currentBorder[4];
      }
   } catch (error) {}
}

function borderWidthChange() {
   try {
      if (currentFig.classList.contains("triangle") || currentFig.classList.contains("octagon")) {
         let newWidth = document.getElementById("borderWidth").value;
         let currentBorder = currentFig.style.border.split(" ");
         currentFig.style.border = newWidth + "px " + currentBorder[1] + " " + currentBorder[2] + currentBorder[3] + currentBorder[4];
      } else {
         let newWidth = document.getElementById("borderWidth").value;
         let currentBorder = currentFig.style.border.split(" ");
         currentFig.style.border = newWidth + "px " + currentBorder[1] + " " + currentBorder[2] + currentBorder[3] + currentBorder[4];
      }
   } catch (error) {}
}

function zindexChange() {
   try {
      zinput = document.getElementById("zin");
      setStyleOn("z-index", zinput.value);
   } catch (error) {}
}

let animationLookup = [
   'heart-beat ', 'spin-right'
];

function addAnimation() {
   var animationToAdd = document.getElementById("animationSelector").value;
   if (animationToAdd in currentFig.classList === true) {
      currentFig.classList.remove(figObj.animation.type);
   }
   currentFig.classList.add(animationToAdd);
   console.log("animationToAdd: ", animationToAdd);
   console.log("currentFigure: ", currentFig);
   figObj.animation.type = animationToAdd;
}

function borderColorChangeBox() {
   try {
      let newColor = document.getElementById("borderColor").value;
      document.getElementById("hexBorderColor").value = newColor;

      if (currentFig.classList.contains("triangle") || currentFig.classList.contains("octagon")) {} else {
         let currentBorder = getBorderArray(currentFig);
         currentFig.style.border = currentBorder[0] + " " + currentBorder[1] + " " + newColor;
      }
   } catch (error) {}
}

function borderColorChangeField() {
   try {
      let newColor = document.getElementById("hexBorderColor").value;
      newColor = "#" + newColor.replace("#", "");
      document.getElementById("borderColor").value = newColor;

      if (currentFig.classList.contains("triangle") || currentFig.classList.contains("octagon")) {


      } else {
         let currentBorder = getBorderArray(currentFig);
         currentFig.style.border = currentBorder[0] + " " + currentBorder[1] + " " + newColor;
      }

   } catch (error) {}
}

function loadBorder(borderArray) {
   try {
      if (currentFig.classList.contains("triangle") || currentFig.classList.contains("octagon")) {} else {
         let rgb = borderArray[2] + borderArray[3] + borderArray[4];
         rgb = rgbToNum(rgb);
         hex = "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
         console.log(hex);
         document.getElementById('borderStyle').value = borderArray[1];
         document.getElementById("borderWidth").value = borderArray[0].replace("px", "");
         document.getElementById("borderColor").value = hex;
         document.getElementById("hexBorderColor").value = hex;
      }
   } catch (error) {}
}

function backgroundColorChangeBox() {
   try {
      let newColor = document.getElementById("backgroundColor").value;
      document.getElementById("hexBackgroundColor").value = newColor;
      if (currentFig.classList.contains("triangle")) {
         let currentBorder = currentFig.style.borderBottom.split(' ');
         currentFig.style.borderBottom = currentBorder[0] + " " + currentBorder[1] + " " + newColor;
      } else if (currentFig.classList.contains("octagon")) {
         let childID = currentFig.id.toString() + "_Octa";
         let child = document.getElementById(childID);
         child.style.backgroundColor = newColor;
      }  else {
         currentFig.style.backgroundColor = newColor;
      }
   } catch (error) {}
}

function backgroundColorChangeField() {
   try {
      let newColor = document.getElementById("hexBackgroundColor").value;
      newColor = "#" + newColor.replace("#", "");
      document.getElementById("backgroundColor").value = newColor;

      if (currentFig.classList.contains("triangle")) {
         let currentBorder = currentFig.style.borderBottom.split(' ');
         currentFig.style.borderBottom = currentBorder[0] + " " + currentBorder[1] + " " + newColor;
      } else if (currentFig.classList.contains("octagon")){
         let childID = currentFig.id.toString() + "_Octa";
         let child = document.getElementById(childID);
         child.style.backgroundColor = newColor;
      }else{
         currentFig.style.backgroundColor = newColor;
      }
   } catch (error) {}
}

function loadBGColor() {
   try {
      var hex; 

      if(currentFig.classList.contains("octagon")) {
         let childID = currentFig.id.toString() + "_Octa";
         let child = document.getElementById(childID);
         let rgb = rgbToNum(child.style.backgroundColor.replace(" ","").replace(" ",""));
         hex = "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
      } else {
         let rgb = rgbToNum(currentFig.style.backgroundColor.replace(" ","").replace(" ",""));
         hex = "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
      }

      document.getElementById("backgroundColor").value = hex;
      document.getElementById("hexBackgroundColor").value = hex;

   } catch (error) {}
}

function loadPosition() {
   document.getElementById("xpos").value = currentFig.style.left.replace("px", "");
   document.getElementById("ypos").value = currentFig.style.top.replace("px", "");
}

function setPosition() {
   currentFig.style.left = document.getElementById("xpos").value;
   currentFig.style.top = document.getElementById("ypos").value;
}

function loadProps(div, figureObject) {
   console.log("loadProps:", div);
   console.log("figureObject: ", figureObject);
   if (figureObject) {
       figObj = figureObject;
   }
   if (div) {
      var borderArray = getBorderArray(div);

      let borderStyleField = document.getElementById("borderStyle");
      let borderWidthField = document.getElementById("borderWidth");
      let hexBorderColorField = document.getElementById("hexBorderColor");
      let borderColorField = document.getElementById("borderColor");

      borderStyleField.setAttribute('disabled', true);
      borderWidthField.setAttribute('disabled', true);
      borderColorField.setAttribute('disabled', true);
      hexBorderColorField.setAttribute('disabled', true);


      setFigure(div.id);
      document.getElementById("zin").value = div.style.zIndex;
      loadPosition();
      if (div.classList.contains("triangle")) {
         var borderBottom = div.style.borderBottom.split(' ');
         heightSlider(borderBottom[0].replace("px", ""));
         var borderSides = parseInt(div.style.borderLeft.split(' ')[0].replace("px", "")) + parseInt(div.style.borderLeft.split(' ')[0].replace("px", ""));
         widthSlider(borderSides);
      } else if (div.classList.contains("octagon")) {
         heightSlider((div.style.height).replace("px", ""));
         widthSlider((div.style.width).replace("px", ""));
         loadBGColor();
      } else {
         borderStyleField.disabled = false;
         borderWidthField.disabled = false;
         borderColorField.disabled = false;
         hexBorderColorField.disabled = false;
         heightSlider((div.style.height).replace("px", ""));
         widthSlider((div.style.width).replace("px", ""));
         loadBorder(borderArray);
         loadBGColor();
      }
   }
}

