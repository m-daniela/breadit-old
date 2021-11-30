import React, {createRef, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { customPost } from '../../utils/constants';
import {useDispatch, useSelector} from "react-redux";
import { getRelativeTime } from '../../utils/relativeTime';
import ReactQuill from 'react-quill';
import CloseRounded from '@material-ui/icons/CloseRounded';
import 'react-quill/dist/quill.bubble.css';
import { AdminContext } from '../../context/AdminContext';
import { deletePost } from '../../utils/serverCalls';
import { removePost } from '../../store/redux';


/**
 * Post Preview
 * Show the information of the given post: title, description 
 * and relative time since it was added. 
 * Each preview is a link which redirects to the actual post. 
 * @param {*} data data of the post object that will be shown 
 * @returns a Link component, showing the post data
 */
const PostPreview = ({data}) => {
    const {isLogged} = useContext(AdminContext);
    const dispatch = useDispatch();
    const {board_id} = useSelector(state => state.board);
    const {post_id, title, description, date_created, board_name} = data;

    const ref = createRef();

    useEffect(() => {
        if (ref.current?.clientHeight < ref.current?.scrollHeight){
            console.log("overflowing");
        }
    }, []);

    const handleRemovePost = (e) => {
        e.preventDefault();
        deletePost(post_id)
            .then(res => {
                if (res.success){
                    dispatch(removePost(post_id));
                }
            })
            .catch(err => console.log(err));
    };


    return (
        <Link className="post-preview col-12 p-4 my-3" to={customPost(board_id ?? board_name, post_id)}>
            <h2 className="d-flex"><span className="col-11 px-0">{title}</span>{isLogged && <CloseRounded className="delete-item align-self-center " onClick={handleRemovePost}/>}</h2>
            <ReactQuill className="preview-description"
                value={description}
                readOnly={true}
                theme={"bubble"}
            />
            <div className="preview-date align-self-end">{getRelativeTime(date_created)}</div>
        </Link>
    );
};

export default PostPreview;
