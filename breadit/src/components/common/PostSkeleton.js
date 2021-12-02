import React, { useState, useEffect } from 'react';

/**
 * Post Skeleton
 * Display a post skeleton when the user is waiting 
 * for the posts to load. If nothing is fetched in 
 * ~5s, show an error message. 
 */
const PostSkeleton = () => {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const delay = setTimeout(() => setShowLoader(false), 5000);
        return () => clearTimeout(delay);
    }, []);

    return (
        <>
            {showLoader ? 
                <div className="post-preview skeleton col-12 px-sm-0 my-3">
            
                    <h2/>
                    <div className="preview-description"/>
                    <div className="preview-date"/>
            
                </div>
                :
                <div className="skeleton-error col-12 px-sm-0 my-3">
                    No data could be found, please try again later. 
                </div>
            }
        </>
    );
};

export default PostSkeleton;
