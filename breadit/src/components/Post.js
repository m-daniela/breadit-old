import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AddPostContext } from '../context/AddPostProvider';
import { addComment, getPost } from '../utils/serverCalls';
import {useDispatch} from "react-redux";
import {selectBoard} from '../store/redux';
import AddPost from './AddPost';
import CommentSection from './CommentSection';
import PostSkeleton from './PostSkeleton';
import Side from './Side';

const Post = () => {
    const {addPost} = useContext(AddPostContext);
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const [data, setData] = useState({title: "", date_created: "", description: ""});
    const {board, post} = useParams();


    const history = useHistory();

    // add the board to the store
    useEffect(() => {
        dispatch(selectBoard(board));
        return () => {
            
        };
    }, []);

    // TODO: save this in the store so you don't have to fetch it again
    useEffect(() => {
        getPost(post, board)
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
                        {data.title ?
                            <> 
                                <div className="post-info">
                                    <h1>{data.title}</h1>
                                    <div className="post-date">{data.date_created}</div>
                                    <div className="post-description">{data.description}</div>
                                </div>
                                <form className="add-comment" onSubmit={writeComment}>
                                    <textarea onChange={e => setComment(e.target.value)} value={comment} required/>
                                    <button>Add comment</button>
                                </form>
                            </>
                            :
                            <PostSkeleton />
                        }
                        
                        <CommentSection currentPost={post}/>
                    </div>
                </>}
            <Side board={board}/>
        </div>
    );
};

export default Post;
