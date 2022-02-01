// import { createStore } from './create-store';
import { createStore, applyMiddleware, compose } from 'redux';
import { asyncIncrement, changeTheme, decrement, increment } from './redux/action';
import { composeWithDevTools } from 'redux-devtools-extension';
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
	// ! Убираем начальное состояние, т.к. рут редьюсер теперь возвращает объект
	// 0,
	// applyMiddleware(thunk)
	// compose(
	// 	applyMiddleware(thunk, logger),
	// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	// )
	composeWithDevTools(applyMiddleware(thunk, logger))
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

themeBtn.addEventListener('click', () => {
	const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
	store.dispatch(changeTheme(newTheme));
});

store.subscribe(() => {
	const state = store.getState();

	counter.textContent = state.counter;
	// document.body.classList.toggle(state.theme.value);
	document.body.classList = state.theme.value;

	[addBtn, sub, asyncBtn, themeBtn].forEach(btn => {
		btn.disabled = state.theme.disabled;
	});
});

store.dispatch({ type: 'INIT_APPLICATION' });
