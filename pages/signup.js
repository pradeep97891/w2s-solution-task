import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Link from 'next/link'
import { postMethod, serverUrl } from '../properties';
import LoadingOverlay from 'react-loading-overlay';
import Router from 'next/router';

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            phone_number: '',
            password: '',
            confirm_password: '',
            showpassword1: true,
            error_msg: '',
            login_sucess: '',
            loaderisActive: false
        }

    }
    //Function to handle input 
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value, error_msg: '' })
    }

    
    // submit the value in register url
    register = () => {
        if ((this.state.email).trim() === '') {
            this.setState({
                error_msg: 'Please enter your email address'
            })
            return false;
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))) {
            this.setState({
                error_msg: "Please enter a valid Email - id"
            })
            return false
        }
        else if ((this.state.phone_number).trim() === '') {
            this.setState({
                error_msg: 'Please enter phone number'
            })
            return false;
        }
        else if (!(/^[0-9]{10}$/i.test(this.state.phone_number))) {
            this.setState({
                error_msg: "Please enter valid mobile number"
            })
            return false
        }
        else if ((this.state.password).trim() === '') {
            this.setState({
                error_msg: "The Password shouldn't be blank"
            })
            return false;
        }

        else if (this.state.password !== this.state.confirm_password) {
            this.setState({
                error_msg: 'Passwords do not match'
            })
            return false;
        }
        this.setState({ loaderisActive: true })


        // this is for fake api's
        const params = {
            "email": "eve.holt@reqres.in",
            "password": "pistol"

        }
        // for our urls we can use this params
        // const params = {
        //     "email": this.state.email,
        //     "password": this.state.password,
        //     "phonenumber":this.state.phone_number,
        // }

        postMethod(`${serverUrl}register`, params).then(res => {
            if (res.id && res.token) {
                this.setState({ loaderisActive: false })
                localStorage.setItem('signup_Details', JSON.stringify(res))
                Router.push('/');
                // Router.push({ pathname: '/',query: { userId: res.id}});
            }
            else {
                this.setState({ loaderisActive: false, error_msg: 'Something went wrong !' })
            }
        })
    }


    render() {
        let error_display = 'none';
        if (this.state.error_msg != '') {
            error_display = 'block';
        }
        return (
            <div>
                <LoadingOverlay active={this.state.loaderisActive} spinner >
                    <Container fluid>
                        <Row className='vh-100'>
                            <Col lg={6} >
                                <Container >
                                    <div className='container-a'>
                                        <h3>Sign up</h3>
                                        <div className='mt-3'>
                                            <h5>If you don&apos;t have account register </h5>
                                            <h5>You can <span style={{ color: '#FF432A' }}>  <a className='text-decoration-none text-reset' href="/" >Login by clicking here !</a></span></h5>
                                        </div>
                                    </div>
                                    <div className='mt-4'>
                                        <div style={{ display: error_display, textAlign: "center", color: 'red', marginBottom: '5px' }}>{this.state.error_msg}</div>

                                        <Form>
                                            <Form.Group className="px-0 col-md-10 mb-1" >
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="text" value={this.state.email} name='email' placeholder="Enter Your Email address" autoComplete="off" onChange={this.handleInput} />
                                            </Form.Group>
                                            <Form.Group className="px-0 col-md-10 mt-2" >
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control type="text" name='phone_number' value={this.state.phone_number} placeholder="Enter Your Phone Number" autoComplete="off" maxLength="10" onChange={this.handleInput} />
                                            </Form.Group>

                                            <Form.Group className="px-0 col-md-10 mt-2" >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" name='password' value={this.state.password} placeholder="Enter Your Password" autoComplete="off" onChange={this.handleInput} />
                                            </Form.Group>
                                            <Form.Group className="px-0 col-md-10 mt-2" >
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control type="password" name='confirm_password' value={this.state.confirm_password} placeholder="Confirm Your Password" autoComplete="off" onChange={this.handleInput} />
                                            </Form.Group>

                                            <div className="d-grid gap-2 mt-5">
                                                <Button className='button-rad' style={{ backgroundColor: '#000842' }} size="lg" onClick={this.register}>
                                                    Register
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </Container>
                                {/* <h4 style={{ color: 'white' }}>Your Logo</h4> */}
                                {/* <img src='Group 33.svg' /> */}
                            </Col>
                            <Col lg={6} className='b-img'>
                                <div className='d-flex justify-content-center mt-5 h-20'>
                                    <img src='w2s.svg' className='icon' />


                                </div>
                            </Col>
                        </Row>
                    </Container>
                </LoadingOverlay>
            </div>)
    }


}
export default Signup;