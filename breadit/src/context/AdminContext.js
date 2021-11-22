import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

const AdminProvider = ({children}) => {
    const [isLogged, setLogged] = useState(localStorage.getItem("admin") ?? false);
    console.log(localStorage.getItem("admin"), "------");

    const login = () => {
        setLogged(true);
        localStorage.setItem("admin", true);
    };

    const logout = () => {
        setLogged(false);
        localStorage.setItem("admin", false);

    };

    return (
        <AdminContext.Provider value={{isLogged, login, logout}}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminProvider;
