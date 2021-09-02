import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../../store/redux';
import { getRelativeTime } from '../../utils/relativeTime';
import { addReply } from '../../utils/serverCalls';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';


/**
 * Comment
 * Holds the comment data: the id, date added, and comment id the 
 * user replies to. The user can see the 
 * @param {*} data the comment data 
 */
const Comment = ({children, data}) => {
    const [open, setOpen] = useState(false);
    const {comment_id, contents, date_added, post_id, reply_to} = data;
    const dispatch = useDispatch();
    const {board_id} = useSelector(state => state.board);

    const [reply, setReply] = useState("");

    const writeReply = (e) => {
        e.preventDefault();
        const date_created = new Date();
        addReply(post_id, reply, date_created, comment_id)
            .then(res => {
                setReply("");
                dispatch(fetchComments({board: board_id, post: post_id}));
                setOpen(false);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="comment" id={comment_id}>
            <span>#{comment_id} {reply_to ? <> replied to <a href={`#${reply_to}`}>#{reply_to}</a></> : <></>} - {getRelativeTime(date_added)} 
            </span>
            <ReactQuill 
                value={contents}
                readOnly={true}
                theme={"bubble"}
            />
            {open 
                ?
                <form onSubmit={writeReply}>
                    <ReactQuill theme="snow" value={reply} onChange={setReply}/>
                    {/* <textarea onChange={e => setReply(e.target.value)} value={reply} required/> */}
                    <div className="buttons">
                        <button onClick={() => setOpen(!open)}>Close</button>
                        <button type="submit">Add comment</button>
                    </div>
                    
                </form>
                :
                <button onClick={() => setOpen(!open)}>Reply</button>
            }
            
            {children}
        </div>
    );
};

export default Comment;
