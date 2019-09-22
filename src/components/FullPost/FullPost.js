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

	loadData = () => {
		const { match: { params: { id } } } = this.props;
		const { post } = this.state;
		if (id) {
			if (!post
				|| (post && post.id !== +id)) {
				axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
					.then((response) => {
						this.setState(() => ({ post: response.data }));
					});
			}
		}
	};


	render() {
		const { match: { params: { id } } } = this.props;
		const { postValue } = this.state;
		let post = <p>Please select a post</p>;
		if (id) {
			post = (
				<div className="FullPost">
					<h1>Loading</h1>
					<p>Loading</p>
					<div className="Edit">
						<button className="Delete">Delete</button>
					</div>
				</div>
			);
			if (post) {
				post = (
					<div className="FullPost">
						<h1>{ postValue.title }</h1>
						<p>{ postValue.body }</p>
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
		return post;
	}
}

export default FullPost;
