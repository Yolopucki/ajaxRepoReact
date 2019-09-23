import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
	state = {
		post: null,
	};

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate() {
		this.loadData();
	}

	deletePostHandler = () => {
		const { match: { params: { id } } } = this.props;
		axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
			.then((response) => console.log(response));
	};

	loadData = async () => {
		const { match: { params: { id } } } = this.props;
		console.log("fetching");
		const { post } = this.state;
		if (id) {
			if (!post
				|| (post && post.id !== +id)) {
				console.log("fetching");
				const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
				console.log(this.response, "response data");
				this.setState(() => ({ post: response.data}));
			}
		}
	};


	render() {
		const { match: { params: { id } } } = this.props;
		const { post } = this.state;
		console.log(post, "state");
		let display = <p>Please select a post</p>;
		if (id) {
			display = (
				<div className="FullPost">
					<h1>Loading</h1>
					<p>Loading</p>
					<div className="Edit">
						<button className="Delete">Delete</button>
					</div>
				</div>
			);
			if (post) {
				display = (
					<div className="FullPost">
						<h1>{ post.title }</h1>
						<p>{ post.body }</p>
						<div className="Edit">
							<button
								className="Delete"
								onClick={ this.deletePostHandler }
							>
								Delete
							</button>
						</div>
					</div>
				);
			}
		}
		return display;
	}
}

export default FullPost;
