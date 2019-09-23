import React, { Component } from "react";
import {
	Route, NavLink, Switch,
} from "react-router-dom";

import "./Blog.css";
import Posts from "./Posts/Posts";
import asyncComponent from "../../hoc/asyncComponent";

const AsyncNewPost = asyncComponent(() => import("./NewPost/NewPost"));

class Blog extends Component {
	state = { auth: true };

	render() {
		const { auth } = this.state;
		return (
			<div className="Blog">
				<header>
					<nav>
						<ul>
							<li>
								<NavLink
									to="/posts/"
									exact
									activeStyle={ { color: "red" } }
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									// exact
									to={ {
										pathname: "/new-post",
										hash: "#work",
									} }
								>
									New Post
								</NavLink>
							</li>
						</ul>
					</nav>
				</header>
				<Switch>
					{ auth && (
						<Route
							path="/new-post"
							exact
							component={ AsyncNewPost }
						/>
					) }
					<Route
						path="/posts/"
						component={ Posts }
					/>
					<Route render={ () => <h1>page not found or you don&lsquo;t have access</h1> } />
				</Switch>
			</div>
		);
	}
}

export default Blog;
