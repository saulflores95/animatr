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
let getBoardText = () => {
    var board = document.getElementById("board");
    var boardText = boardText.innerHTML;
    console.log("boardText: ", boardText);
    return boardText;
}

/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
let stringToHTML = function (str) {

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

let addElementToBoard = function (children) { 
    var board = document.getElementById("board");
    element.appendChild(children);       
} ;

