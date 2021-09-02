import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AddPostContext } from '../../context/AddPostProvider';
import { addComment, getPost } from '../../utils/serverCalls';
import {useDispatch} from "react-redux";
import {fetchComments, selectBoard} from '../../store/redux';
import AddPost from '../side/AddPost';
import CommentSection from './CommentSection';
import PostSkeleton from '../common/PostSkeleton';
import Side from '../side/Side';
import { getRelativeTime } from '../../utils/relativeTime';
import Head from '../common/Head';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';


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
    }, []);

    // TODO: save this in the store so you don't have to fetch it again
    useEffect(() => {
        getPost(post, board)
            .then(res => {
                setData(res);
            })
            .catch(err => console.log(err));
    }, []);


    const writeComment = (e) => {
        e.preventDefault();
        const date_created = new Date();
        addComment(post, comment, date_created)
            .then(res => {
                setComment("");
                dispatch(fetchComments({board, post}));
            })
            .catch(err => console.log(err));
    };
    
    return (
        <>
            <Head title={data.title} />
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
                                        <div className="post-date">{getRelativeTime(data.date_created)}</div>
                                        <ReactQuill className="post-description"
                                            value={data.description}
                                            readOnly={true}
                                            theme={"bubble"}
                                        />
                                    </div>
                                    <form className="add-comment" onSubmit={writeComment}>
                                        <ReactQuill theme="snow" value={comment} onChange={setComment} />
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
        </>
    );
};

export default Post;
