import React, { useState } from 'react';
import { addReply } from '../utils/serverCalls';

const Comment = ({children, data}) => {
    const [open, setOpen] = useState(false);
    const {comment_id, contents, date_added, post_id} = data;

    const [reply, setReply] = useState("");

    const writeReply = (e) => {
        e.preventDefault();
        const date_created = new Date();
        addReply(post_id, reply, date_created, comment_id)
            .then(res => {
                console.log(res);
                setReply("");
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="comment">
            <span>#{comment_id} {date_added}</span>
            <div>{contents}</div>
            {open 
                ?
                <form onSubmit={writeReply}>
                    <textarea onChange={e => setReply(e.target.value)} value={reply} required/>
                    <div>
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
