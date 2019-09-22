import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import axios from "axios";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";

axios.interceptors.request.use((request) => {
	console.log(request, "global");
	// may edir before returning
	return request;
},
(error) => {
	console.log(error, "global");
	return Promise.reject(error);
});
axios.interceptors.response.use((response) => {
	console.log(response, "global");
	return response;
},
(error) => {
	console.log(error, "global");
	return Promise.reject(error);
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
