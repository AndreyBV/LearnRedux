// import { createStore } from './create-store';
import { createStore, applyMiddleware } from 'redux';
import { asyncIncrement, decrement, increment } from './redux/action';
import { rootReducer } from './redux/rootReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import { DECREMENT, INCREMENT } from './redux/types';
import './styles.css';

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

// ! Реализация middleware
// function logger(state) {
// 	return function (next) {
// 		return function (action) {
// 			console.log('Prev state', state.getState());
// 			const newState = next(action);
// 			// console.log('Next state', newState.getState());
// 			return newState;
// 		};
// 	};
// }

const store = createStore(
	rootReducer,
	0,
	// applyMiddleware(thunk)
	applyMiddleware(thunk, logger)
);

// window.store = store;

addBtn.addEventListener('click', () => {
	// store.dispatch({ type: INCREMENT });
	store.dispatch(increment());
});
subBtn.addEventListener('click', () => {
	// store.dispatch({ type: DECREMENT });
	store.dispatch(decrement());
});
asyncBtn.addEventListener('click', () => {
	// ! Проблема асинхронности
	// setTimeout(() => {
	// 	store.dispatch(increment());
	// }, 2000);
	// !
	store.dispatch(asyncIncrement());
	// ! Выход из ситуации: реализация редакс мидлвара (thunk)
});

store.subscribe(() => {
	const state = store.getState();

	counter.textContent = state;
});
store.dispatch({ type: 'INIT_APPLICATION' });

themeBtn.addEventListener('click', () => {
	document.body.classList.toggle('dark');
});
