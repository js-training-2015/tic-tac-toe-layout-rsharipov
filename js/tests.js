(function(){

function runTests() {
	QUnit.test("parsing state", function (assert) {
		assert.deepEqual(parseState('X___0_X__X'), { 
			mine: 'X', 
			board: [ ['_', '_', '_'], 
					 ['0', '_', 'X'], 
					 ['_', '_', 'X'] 
			]
		});
		assert.throws(function() { parseState('-__0___XX_')}, "state must be represented as 10-character string of 'X', 'O' and '_'");
	});
	QUnit.test("next states", function (assert) {
		function addMove(state, move) {
			return {
				state: state,
				move: move
			};
		}
		var initialState = parseState('X___0_X__X');
		var expectedNext = [
			addMove(parseState('0X__0_X__X'), [0, 0]),
			addMove(parseState('0_X_0_X__X'), [0, 1]),
			addMove(parseState('0__X0_X__X'), [0, 2]),
			addMove(parseState('0___0XX__X'), [1, 1]),
			addMove(parseState('0___0_XX_X'), [2, 0]),
			addMove(parseState('0___0_X_XX'), [2, 1])
		]
		assert.deepEqual(calculateNextMoves(initialState), expectedNext);
	});
	QUnit.test("winning state", function (assert) {
		assert.ok(isWinningFor(parseState('X__X__X__X').board, 'X'));
	});
	QUnit.test("getLine", function (assert) {
		assert.ok(getLine(parseState('X__X__X__X').board, 0, 0, 1, 0), '___');
		assert.ok(getLine(parseState('X__X__X__X').board, 0, 1, 1, 0), '___');
		assert.ok(getLine(parseState('X__X__X__X').board, 0, 2, 1, 0), 'XXX');
		assert.ok(getLine(parseState('X__X__X__X').board, 0, 0, 1, 0), '__X');
		assert.ok(getLine(parseState('X__X_0X__X').board, 2, 0, -1, 1), '_0X');
	});
	QUnit.test("getWinningLine", function (assert) {
		assert.ok(getWinningLine('X'), 'XXX');
		assert.ok(getWinningLine('0'), '000');
	});
	
	QUnit.test("findBestMove", function (assert) {
		var bestMove = findBestMove(parseState('X__X_____X'));
		assert.equal(bestMove.result, 1);
		assert.deepEqual(bestMove.move, [1, 2]);
	});
}

document.addEventListener('DOMContentLoaded', function() {
	runTests();
});

})();