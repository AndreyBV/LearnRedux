import { INCREMENT, DECREMENT, ASYNC_INCREMENT } from './types';

export function rootReducer(state, action) {
	if (action.type === INCREMENT) {
		return state + 1;
	} else if (action.type == DECREMENT) {
		return state - 1;
	}
	// else if (action.type == ASYNC_INCREMENT) {
	// 	// setTimeout(() => {
	// 	// 	return state + 1;
	// 	// }, 2000); // ! проблема асинхронности Redux: всегда должен возвращаться стейт, рутредьюссер дб синхронным
	// 	return state + 1;
	// }
	return state;
}
