import React, {createContext, useState} from 'react';


/**
 * Add Post context and provider
 * Displays the AddPost form over the posts or 
 * search results. 
 */
export const AddPostContext = createContext();

const AddPostProvider = ({children}) => {
    const [addPost, setAddPost] = useState(false);

    const showAddOverlay = () =>{
        setAddPost(!addPost);
    };
    return (
        <AddPostContext.Provider value={{addPost, showAddOverlay}}>
            {children}
        </AddPostContext.Provider>
    );
};

export default AddPostProvider;
