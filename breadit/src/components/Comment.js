import React, { useState } from 'react';

const Comment = ({children}) => {
    const [open, setOpen] = useState(false);

    const openTextarea = () => {

    };

    return (
        <div className="comment">
            <span>#id and time since posting</span>
            <div>comment</div>
            {open ?
                <form>
                    <textarea></textarea>
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
