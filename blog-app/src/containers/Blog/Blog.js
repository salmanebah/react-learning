import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {  

    state = {
        posts: [],
        selectedPostId: null
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => ({...post, 'author': 'Max'}));
                this.setState({posts: updatedPosts});
            });
    }

    postSelectedHandler = (postId) => {
        this.setState({selectedPostId: postId});
    }

    render () {
        const posts = this.state.posts.map(post => <Post key={post.id} title={post.title} 
                                                         author={post.author} onClick={() => this.postSelectedHandler(post.id)} />)
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;