import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AddPostContext } from '../../context/AddPostProvider';
import { addComment, deletePost, getPost } from '../../utils/serverCalls';
import {useDispatch} from "react-redux";
import {fetchComments, removePost, selectBoard} from '../../store/redux';
import AddPost from '../side/AddPost';
import CommentSection from './CommentSection';
import PostSkeleton from '../common/PostSkeleton';
import Side from '../side/Side';
import { getRelativeTime } from '../../utils/relativeTime';
import Head from '../common/Head';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { AdminContext } from '../../context/AdminContext';
import CloseRounded from '@material-ui/icons/CloseRounded';
import Button from "react-bootstrap/Button";

const Post = () => {
    const {isLogged} = useContext(AdminContext);
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

    const handleRemovePost = (e) => {
        e.preventDefault();
        deletePost(post)
            .then(res => {
                if (res.success){
                    dispatch(removePost(post));
                    history.goBack();
                }
            })
            .catch(err => console.log(err));
    };
    
    return (
        <>
            <Head title={data.title} />
            <div className="board-wrapper col-12 col-lg-6">
                <div className="post-wrapper px-0 col-12 my-3">
                    {addPost 
                        ?
                        <AddPost/>
                        :
                        <div className="post-display row">
                            {data.title ?
                                <div className="post d-flex flex-column py-4 px-5 my-3 col-12 ">
                                    <Button onClick={history.goBack} className="btn-custom">Go back</Button>
                                    <div className="post-info p-0">
                                        <h1 className="d-flex ">
                                            <span className="col-11 px-0">{data.title}</span> 
                                            {isLogged && <CloseRounded className="delete-item align-self-center" onClick={handleRemovePost}/>}
                                        </h1>
                                        <div className="post-date">{getRelativeTime(data.date_created)}</div>
                                        <ReactQuill className="post-description"
                                            value={data.description}
                                            readOnly={true}
                                            theme={"bubble"}
                                        />
                                    </div>
                                    <form className="add-comment d-flex flex-column py-4" onSubmit={writeComment}>
                                        <div>
                                            <ReactQuill theme="snow" value={comment} onChange={setComment} />
                                        </div>
                                        <Button className="btn-custom align-self-end mt-4" onClick={writeComment}>Add comment</Button>
                                    </form>
                                    <CommentSection currentPost={post}/>

                                </div>
                                :
                                <PostSkeleton />
                            }
                            
                        </div>}
                </div>
                

            </div>
            <Side board={board}/>
        </>
    );
};

export default Post;
