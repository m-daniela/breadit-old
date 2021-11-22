import React, {useContext, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import { routes } from '../../utils/constants';
import { authenticate } from '../../utils/serverCalls';
import Head from '../common/Head';

const Admin = () => {
    const {isLogged, login, logout} = useContext(AdminContext);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticate(email, password)
            .then(res => {
                if (res.success){
                    login();
                    history.replace(routes.main);
                }
                else{
                    setError(res.error);
                }
            })
            .catch(console.log);
    };

    return (
        <>
            <Head title={"Log in as admin"}/>
            <div className="main-wrapper">
                <div className="main">
                    {
                        isLogged 
                            ? 
                            <>
                                <span>You are logged in as Admin</span>
                                <span onClick={logout}>Logout</span>
                                <Link to={routes.main}>Go back home</Link>
                            </>
                            :
                            <form id="admin-form" onSubmit={handleSubmit} method="post">
                                <span>{error}</span>
                                <label>Email</label>
                                <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required/>

                                <label>Password</label>
                                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required/>

                                <button type="submit">Login as administrator</button>
                                <Link to={routes.main}>Go back home</Link>
                            </form> 
                    }
                    
                </div>
            </div>
        </>
    );
};

export default Admin;
