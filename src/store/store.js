import { createStore } from "redux";

const initialState = {
	result: 1,
	lastValues: [],
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD":
			return { ...state, result: state.result + action.payload };
		case "SUBTRACT":
			return { ...state, result: state.result - action.payload };
		default: return state;
	}
};

const store = createStore(reducer);
store.subscribe(() => {
	console.log("store updated", store.getState());
});
store.dispatch({
	type: "ADD",
	payload: 22,
});
store.dispatch({
	type: "SUBTRACT",
	payload: 10,
});
