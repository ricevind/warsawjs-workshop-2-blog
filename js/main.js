

var $input = $('#drukarkaFeed');
var $inputTytul = $('#drukarkaFeedTytul');

var $output = $('#drukarkaOutput p');
var $outputTytul = $('#drukarkaOutput h1');

function Printer(input, inputTytul, output, outputTytul){
	this._text = '';
	this._textTytul = '';
	this._input = input;
	this._inputTytul = inputTytul;
	this._output = output;
	this._outputTytul = outputTytul;

	// binding to events
	this._input.keyup(this.setText.bind(this));
	this._inputTytul.keyup(this.setTextTytul.bind(this));

}

Printer.prototype = {
	print: function(){
		var self = this;
		this._output.text(self._text);
		this._outputTytul.text(self._textTytul);

	},
	setText: function(eve) {
		this._text = eve.target.value;
		this.print();
	},
	setTextTytul: function(eve) {
		this._textTytul = eve.target.value;
		this.print();
	}
};

var printer = new Printer($input,$inputTytul, $outputTytul, $output);


