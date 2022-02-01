// action creators

import { ASYNC_INCREMENT, DECREMENT, INCREMENT } from './types';

export function increment() {
	return { type: INCREMENT };
}
export function decrement() {
	return { type: DECREMENT };
}

export function asyncIncrement() {
	// return { type: ASYNC_INCREMENT };
	return function (dispatch) {
		// ! middleware
		setTimeout(() => {
			// dispatch({ type: ASYNC_INCREMENT });
			dispatch(increment());
		}, 2000);
	};
}
