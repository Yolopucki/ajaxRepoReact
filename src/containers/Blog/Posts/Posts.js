import React, { Component } from "react";
import { Route } from "react-router-dom";

import axios from "axios";
import Post from "./Post/Post";
import "./Posts.css";
import FullPost from "../../../components/FullPost/FullPost";

class Posts extends Component {
	state = {
		posts: [],
		error: false,
	};

	componentDidMount() {
		axios.get("https://jsonplaceholder.typicode.com/posts")
			.then((response) => {
				const posts = response.data.slice(0, 4);
				const updatedPosts = posts.map((post) => ({
					...post,
					author: "Victor",
				}));
				this.setState({ posts: updatedPosts });
			})
			.catch(() => this.setState({ error: true }));
	}

	postSelectedHandler = (id) => {
		const { history } = this.props;
		history.push({ pathname: `/posts/${id}` });
	};

	render() {
		const { error, posts } = this.state;
		const { match } = this.props;
		let postsDisplay = <p>something went wrong</p>;
		if (!error) {
			postsDisplay = posts.map((post) => (
				<Post
					key={ post.id }
					title={ post.title }
					clicked={ () => this.postSelectedHandler(post.id) }
					author={ post.author }
				/>
			));
		}
		return (
			<div>
				<section className="Posts">
					{ postsDisplay }
				</section>
				<Route
					path={ `${match.url}/:id` }
					exact
					component={ FullPost }
				/>
			</div>
		);
	}
}

export default Posts;
