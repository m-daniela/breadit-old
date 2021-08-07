import React, {createContext, useState} from 'react';

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
