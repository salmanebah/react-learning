import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {

    state = {
        loadedPost: null
    }

    componentDidUpdate() {
        if (this.props.id !== null) {
            axios.get(`https://jsonplaceholder.typicode.com/posts/${this.props.id}`)
                .then(response => this.setState({loadedPost: response.data}));
        }
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id === null) {
            return post;
        }
        post = (
            <div className="FullPost">
                <h1>{this.state.loadedPost.title}</h1>
                <p>{this.state.loadedPost.content}</p>
                <div className="Edit">
                    <button className="Delete">Delete</button>
                </div>
            </div>

        );
        return post;
    }
}

export default FullPost;