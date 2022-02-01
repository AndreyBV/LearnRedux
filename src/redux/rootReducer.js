import { combineReducers } from 'redux';
import {
	INCREMENT,
	DECREMENT,
	ASYNC_INCREMENT,
	CHANGE_THEME,
	ENABLE_BUTTONS,
	DISABLE_BUTTONS,
} from './types';

// ! Редьюсер для каунтера
// export function counterReducer(state, action) {
function counterReducer(state = 0, action) {
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

// ! Редьюсер для темы
const initialThemeState = {
	value: 'light',
	disabled: false,
};

// export function themeReducer(state, action) {
function themeReducer(state = initialThemeState, action) {
	switch (action.type) {
		case CHANGE_THEME:
			// ! Редьюсер не мутирует прошлое состояние... state.theme = 'dark'
			// return { ...state, value: 'dark' };
			return { ...state, value: action.payload };
		case ENABLE_BUTTONS:
			return { ...state, disabled: false };
		case DISABLE_BUTTONS:
			return { ...state, disabled: true };
		default:
			return state;
	}
}

export const rootReducer = combineReducers({
	counter: counterReducer,
	theme: themeReducer,
});
