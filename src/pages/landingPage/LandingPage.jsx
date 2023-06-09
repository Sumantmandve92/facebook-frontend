import { Button, Spinner } from 'react-bootstrap'
import './landingPage.css';
import { Facebook } from 'react-bootstrap-icons';
import React, { useState, useRef } from 'react';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { loginAPI } from '../../API-globle-state';
import { useContext } from 'react';

import axios from 'axios';
import { AuthContext } from '../../context/loginState/AuthContext';
/**
 * 
 */
const LandingPage = () => {
    // to toggle login/registration forms=>
    const [showlogin, setShowLogin] = useState(false);
    const [showregister, setShowRegister] = useState(false);

    const handleCloselogin = () => setShowLogin(false);
    const handleShowlogin = () => setShowLogin(true);
    const handleCloseregister = () => setShowRegister(false);
    const handleShowregister = () => setShowRegister(true);
    // input data states=>
    const { user, isFetching, dispatch } = useContext(AuthContext);
    // const email = useRef();
    // const password = useRef();
    // const username = useRef();
    const [email,setEmail]=useState('')
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    // ============================================================


    const registerNewUser = (e) => {
        e.preventDefault();
        console.log({ username: username, email: email, password: password })
        const url = "http://localhost:8080/api/auth/registerUser";
        axios.post(url, { username: username, email: email, password: password })
            .then((res) => {
                alert("registration done")
                console.log(res)
            })
            .catch((error) => {
                console.log(error);
            })
        handleCloseregister();
        handleShowlogin();
    }
    const userLogin = (e) => {
        e.preventDefault();
        console.log({ email: email, password: password });
        loginAPI({ email: email, password: password }, dispatch);
        console.log(user)
        handleCloselogin();
    }


    return (
        <>
            <div className="landing-page">

                <div className="landing-page-container">
                    <div className="leftside-container">

                        <div className="logo-container">
                            <Facebook color=' rgb(33, 33, 250)' size={"50px"} />
                            <span className="app-name">Facebook</span>
                        </div>
                        <div className="instructions">
                            <ul>
                                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="rightside-container">


                        <Button className='btn' variant="primary" onClick={handleShowlogin}>
                            {isFetching ? <Spinner animation="border" variant="light" /> : " Sign In"}
                        </Button>

                        <Modal show={showlogin} onHide={handleCloselogin}>
                            <Modal.Header closeButton>
                                <Modal.Title>Sign In</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="name@example.com"
                                            autoFocus
                                            required
                                            value={email}
                                            onChange={(e)=>setEmail(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            required
                                            placeholder="Enter your password"
                                            autoFocus

                                            value={password}
                                            onChange={(e)=>setPassword(e.target.value)}
                                        />
                                    </Form.Group>

                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloselogin}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={userLogin}>
                                    Sign In
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Button className='btn' variant="success" onClick={handleShowregister}>
                            New User
                        </Button>

                        <Modal show={showregister} onHide={handleCloseregister}>
                            <Modal.Header closeButton>
                                <Modal.Title>New Registration</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter User name"
                                            autoFocus
                                            required
                                            value={username}
                                            onChange={(e)=>setUsername(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="name@example.com"
                                            autoFocus
                                            required
                                            value={email}
                                            onChange={(e)=>setEmail(e.target.value)}

                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter your password"
                                            autoFocus
                                            required
                                            value={password}
                                            onChange={(e)=>setPassword(e.target.value)}
                                        />
                                    </Form.Group>

                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseregister}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={registerNewUser}>
                                    register
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>

            </div>
        </>
    );
}

// #endregion

export default LandingPage;