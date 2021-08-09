import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AddPostContext } from '../context/AddPostProvider';
import { addComment, getPost } from '../utils/serverCalls';
import AddPost from './AddPost';
import CommentSection from './CommentSection';
import Side from './Side';

const Post = () => {
    const {addPost} = useContext(AddPostContext);
    const [comment, setComment] = useState("");
    const [data, setData] = useState({title: "", date_created: "", description: ""});
    const {board, post} = useParams();

    const history = useHistory();

    // TODO: save this in the store so you don't have to fetch it again
    useEffect(() => {
        getPost(post)
            .then(res => {
                setData(res);
            })
            .catch(err => console.log(err));
        return () => {
        };
    }, []);


    const writeComment = (e) => {
        e.preventDefault();
        const date_created = new Date();
        addComment(post, comment, date_created)
            .then(res => {
                console.log(res);
                setComment("");
            })
            .catch(err => console.log(err));
    };
    
    return (
        <div className="post-wrapper">
            {addPost 
                ?
                <AddPost/>
                :
                <>
                    <div className="post">
                        <button onClick={history.goBack}>Go back</button>
                        <div className="post-info">
                            You are on post {post}, board {board}
                            <h1>{data.title}</h1>
                            <div className="post-date">{data.date_created}</div>
                            <div className="post-description">{data.description}</div>
                        </div>
                        <form className="add-comment" onSubmit={writeComment}>
                            <textarea onChange={e => setComment(e.target.value)} value={comment} required/>
                            <button>Add comment</button>
                        </form>
                        <CommentSection currentPost={post}/>
                    </div>
                </>}
            <Side board={board}/>
        </div>
    );
};

export default Post;
