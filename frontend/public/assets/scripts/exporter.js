import { dragElement } from './utils.js';
let oldText = '';

/**
 * we’ll first check if DOMParser exists in the window. 
 * If not, we’ll return false. Next, we’ll try to use parseFromString() to create a document. 
 * If it fails, we’ll return false. Otherwise, we’ll return true.
 */
let support = (function () {
	if (!window.DOMParser) return false;
	var parser = new DOMParser();
	try {
		parser.parseFromString('x', 'text/html');
	} catch(err) {
		return false;
	}
	return true;
})();

/**
 * Returns the text from a HTML string
 * 
 * @param {html} String The html string
 */
let stripHtml = (html) => {
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

/**
 * Returns the contents of the drawing board as string form
 * 
 * @param {} String The html string
 */
window.getBoardText = () => {
    let board = document.getElementById("board");
    let boardText = board.innerHTML;
    oldText = boardText;
    return boardText;
};

window.loadBoard = (htmlString) => {
    let board = document.getElementById("board");
    console.log("oldText: ", oldText);
    let childElement = stringToHTML(htmlString)
    let array = [ ...childElement.childNodes ];
    array.forEach(element => {
        dragElement(element)
        board.appendChild(element);
    });

};

/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
let stringToHTML =  (str) => {

	// If DOMParser is supported, use it
	if (support) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(str, 'text/html');
		return doc.body;
	}

	// Otherwise, fallback to old-school method
	var dom = document.createElement('div');
	dom.innerHTML = str;
	return dom;

};

/**
 * appends a DOM element and appends it the drawing board/
 * @param  {DOM} children The actual board element
 * @return {}
 */
window.addElementToBoard = () => { 
    let text = ""
    let board = document.getElementById("board");
    board.appendChild(children);       
};

window.clearBoard = () => {
    let board = document.getElementById("board");
    board.innerHTML = ""
};

// window.getCSS = () => {
//     var css = [];
//     for (var i=0; i<document.styleSheets.length; i++) {
//         var sheet = document.styleSheets[i];
//         var rules = ('cssRules' in sheet)? sheet.cssRules : sheet.rules;
//         if (rules)
//         {
//             css.push('\n/* Stylesheet : '+(sheet.href||'[inline styles]')+' */');
//             for (var j=0; j<rules.length; j++)
//             {
//                 var rule = rules[j];
//                 if ('cssText' in rule)
//                     css.push(rule.cssText);
//                 else
//                     css.push(rule.selectorText+' {\n'+rule.style.cssText+'\n}\n');
//             }
//         }
//     }
//     var cssInline = css.join('\n')+'\n';
// };

window.getCSS = (el) => {
    console.log(el.style.cssText)
    let style = "#" + el.id + " { " + el.style.cssText + " } \n";
    console.log(style)
    return style;
};

window.editors = {
    'html': '',
    'css': '',
    'js':''
};

window.exportBoardToJson = (figures, save) => {
    console.log("exportBoardToJson figures: ", figures);
    editors['html'] = getBoardText();
    editors['css'] = '';
    // let drawingID = new Date().getUTCMilliseconds();
    let drawingID = url.searchParams.get("drawingID");
    if (figures) {
        figures.forEach(fig => {
            editors['css'] += getCSS(fig.div);
            let url = 'localhost:5000/api/figures';
            if (save) {
                let newOrUpdateFigure = {
                    drawingID: drawingID,
                    text: 'drawingFigureTest',
                    name: 'drawingFigureTest',
                    figure_type: fig.type,
                    size: {
                      width: fig.div.style.width,
                      height: fig.div.style.height
                    },
                    animation: {
                      time: null, //2s
                      type: fig.animation.type, //fade
                      property: null //height
                    },
                    cordinates: {
                        x: fig.div.style.top,
                        y: fig.div.style.left
                    },
                    div: fig.div.innerHTML,
                };
                if (fig.id) {
                    console.log('Figure exists needs to update')
                    fetch('http://localhost:5000/api/figure/edit/' + fig.id, {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(newOrUpdateFigure)
                    })
                } else {
                    console.log("saving newDrawing: ", JSON.stringify(newOrUpdateFigure));
                    fetch('http://localhost:5000/api/figure/', {
                        method: 'post',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(newOrUpdateFigure)
                    })
                    .then(response => response.json())
                    .then(data => console.log(data));
                }
            }
        });
    }

    return editors;
};

// let loadPreviouseSession = () => {
//     if(localStorage.animatrSession) {
//         clearBoard();
//         let animatorSession = JSON.parse(localStorage.getItem("animatrSession"));
//         console.log('loading previouse animatr session: ', localStorage.animatrSession);
//         loadBoard(animatorSession.html);
//     }
// };
//
// loadPreviouseSession()