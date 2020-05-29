var currentFig;

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
   rgb = rgb.replace(",", "");
   rgb = rgb.replace(",", "");
   return rgb.split('');
}

function componentToHex(c) {
   var hex = c.toString(16);
   return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
   return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function heightSlider(value) {
   try {
      document.getElementById('rangeSlider').innerHTML = value;
      document.getElementById('rangeHeight').value = value;

      if (currentFig.classList.contains("triangle") || currentFig.classList.contains("octagon")) {

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

      if (currentFig.classList.contains("triangle") || currentFig.classList.contains("octagon")) {
         let newBorderSides;
         let borderArray = currentFig.style.borderLeft.split(' ');

         if (currentFig.style.borderLeft.includes("transparent"))
            newBorderSides = (value / 2).toString() + "px " + borderArray[1] + " " + borderArray[2]
         else
            newBorderSides = (value / 2).toString() + "px " + borderArray[1] + " " + borderArray[2] + borderArray[3] + borderArray[4];

         currentFig.style.borderLeft = newBorderSides;
         currentFig.style.borderRight = newBorderSides;
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
      if (currentFig.classList.contains("triangle") || currentFig.classList.contains("octagon")) {} else {
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
         hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
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

      if (currentFig.classList.contains("triangle") || currentFig.classList.contains("octagon")) {
         let currentBorder = currentFig.style.borderBottom.split(' ');
         currentFig.style.borderBottom = currentBorder[0] + " " + currentBorder[1] + " " + newColor;
      } else {
         currentFig.style.backgroundColor = newColor;
      }
   } catch (error) {}
}

function backgroundColorChangeField() {
   try {
      let newColor = document.getElementById("hexBackgroundColor").value;
      newColor = "#" + newColor.replace("#", "");
      document.getElementById("backgroundColor").value = newColor;

      if (currentFig.classList.contains("triangle") || currentFig.classList.contains("octagon")) {
         let currentBorder = currentFig.style.borderBottom.split(' ');
         currentFig.style.borderBottom = currentBorder[0] + " " + currentBorder[1] + " " + newColor;
      } else {
         currentFig.style.backgroundColor = newColor;
      }
   } catch (error) {}
}

function loadBGColor() {
   try {
      let rgb = rgbToNum(currentFig.style.backgroundColor);
      hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
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

function loadProps(div) {
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