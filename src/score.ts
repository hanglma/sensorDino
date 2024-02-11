type score = {
	increment: (val: number) => void;
	decrement: (val: number) => void;
	reset: () => void;
};

export const createScore = (init: number, scoreBoard: HTMLSpanElement): score => {
	let currentVal: number = init;
	const updateScore = () => (scoreBoard.innerHTML = currentVal.toString());
	return {
		increment: (val: number) => {
			currentVal += val;
			updateScore();
		},
		decrement: (val: number) => {
			currentVal += val;
			updateScore();
		},
		reset: () => {
			currentVal = init;
			updateScore();
		},
	};
};
