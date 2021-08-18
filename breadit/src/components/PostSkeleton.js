import React, { useState } from 'react';

// Post skeleton
// displayed when the user is waiting for the post/s to load
// if nothing changes in ~5s, display an error message
const PostSkeleton = () => {
    const [showLoader, setShowLoader] = useState(true);

    setTimeout(() => setShowLoader(false), 5000);

    return (
        <>
            {showLoader ? 
                <div className="post-preview skeleton">
            
                    <h2/>
                    <div className="preview-description"/>
                    <div className="preview-date"/>
            
                </div>
                :
                <div className="skeleton-error">
                    No data could be found, please try again later. 
                </div>
            }
        </>
    );
};

export default PostSkeleton;
