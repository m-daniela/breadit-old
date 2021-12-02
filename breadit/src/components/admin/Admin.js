import React, {useContext, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import { routes } from '../../utils/constants';
import { authenticate } from '../../utils/serverCalls';
import Head from '../common/Head';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


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
            <Head title={"Log in as Administrator"}/>
            <div className="wrapper container d-flex align-items-center justify-content-center vh-100">
                <div className="landing row flex-column justify-content-center align-items-center m-auto py-5">
                    {
                        isLogged ?
                            <>
                                <h2>Admin page</h2>
                                <span></span>
                                <span onClick={logout}>Logout</span>
                                <Link to={routes.main}>Go back home</Link>
                            </>
                            :
                            <Form className="d-flex flex-column col-8 col-md-6" onSubmit={handleSubmit} method="post">
                                <h2 className="text-center">Log in</h2>
                                <Form.Label >
                                    Email
                                </Form.Label>
                                <Form.Control type="email" name="email" className="input-custom" value={email} onChange={e => setEmail(e.target.value)} required/>
                                <Form.Label className="mt-3">
                                    Password
                                </Form.Label>
                                <Form.Control type="password" name="password" className="input-custom" value={password} onChange={e => setPassword(e.target.value)} required />
                                <span className="mt-3">{error}</span>
                                <Button type="submit" className="btn-custom mt-3">Login as Administrator</Button>
                                <Link to={routes.main} className="mt-2">Go back home</Link>
                            </Form>
                    }
                    
                </div>
            </div>
        </>
    );
};

export default Admin;
