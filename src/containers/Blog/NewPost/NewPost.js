import React, { Component } from "react";
import axios from "axios/index";
import { Redirect } from "react-router-dom";

import "./NewPost.css";

class NewPost extends Component {
	state = {
		title: "",
		content: "",
		author: "Vitya",
		submitted: false,
	};

	postDataHandler = () => {
		const { title, content, author } = this.state;
		const { history } = this.props;
		const post = {
			title,
			content,
			author,
		};
		axios.post("https://jsonplaceholder.typicode.com/posts", post)
			.then((response) => {
				console.log(response);
				history.push("/");
			});
		// this.setState({submitted: true})
	};


	render() {
		const {
			submitted, content, author, title,
		} = this.state;
		return (
			<div className="NewPost">
				{ submitted && <Redirect to="/posts/" /> }
				<h1>Add a Post</h1>
				<label>Title</label>
				<input
					type="text"
					value={ title }
					onChange={ (event) => this.setState({ title: event.target.value }) }
				/>
				<label>Content</label>
				<textarea
					rows="4"
					value={ content }
					onChange={ (event) => this.setState({ content: event.target.value }) }
				/>
				<label>Author</label>
				<select
					value={ author }
					onChange={ (event) => this.setState({ author: event.target.value }) }
				>
					<option value="Max">Max</option>
					<option value="Manu">Manu</option>
				</select>
				<button onClick={ this.postDataHandler }>Add Post</button>
			</div>
		);
	}
}

export default NewPost;
