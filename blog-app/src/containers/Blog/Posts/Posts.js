import React, {Component} from 'react';
import axios from 'axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import { Route } from 'react-router-dom';
import FullPost from '../../FullPost/FullPost';

class Posts extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => ({...post, 'author': 'Max'}));
                this.setState({posts: updatedPosts});
            }).catch(error => console.log(error));
    }

    postSelectedHandler = (postId) => {
        this.props.history.push({pathname: '/posts/' + postId});
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong !</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => ( //<Link key={post.id}  to={'/' + post.id}>
                                                        <Post title={post.title} key={post.id}
                                                          author={post.author} onClick={() => this.postSelectedHandler(post.id)} />));
                                                  //</Link>));
        }

       return (
           <div>
               <section className="Posts">
                {posts}
            </section>
            <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
           </div>
            
       );
    }
}

export default Posts;