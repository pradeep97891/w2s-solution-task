import React, { Component } from 'react';
import styles from '../styles/Home.module.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Router from 'next/router'
import LoadingOverlay from 'react-loading-overlay';
import { postMethod, serverUrl } from '../properties';


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error_msg: '',
      loaderisActive: false
    }

  }
  //Function to handle input 
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value, error_msg: '' })
  }
  handle_login = () => {

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
    else if ((this.state.password).trim() === '') {
      this.setState({
        error_msg: "The Password shouldn't be blank"
      })
      return false;
    }
    // this is for fake api's
    const params = {
      "email": "eve.holt@reqres.in",
      "password": "cityslicka"
    }

    // for our urls we can use this params
    // const params = {
    //   "email": this.state.email,
    //   "password": this.state.password
    // }
    this.setState({loaderisActive:true})
    postMethod(`${serverUrl}login`, params).then(res => {
      if (res.token) {
        this.setState({ loaderisActive: false })
        localStorage.setItem('login_Details', JSON.stringify(res))
        Router.push('/dashboard');
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
                    <h3>Sign in</h3>
                    <div className='mt-3'>
                      <h5>If you don&apos;t have account register </h5>
                      <h5>You can <span style={{ color: '#FF432A' }}><a href='/signup' className='text-decoration-none text-reset'> Register by clicking Here !</a></span></h5>
                    </div>
                  </div>
                  <div className='mt-4'>
                    <div style={{ display: error_display, textAlign: "center", color: 'red', marginBottom: '5px' }}>{this.state.error_msg}</div>

                    <Form>
                      <Form.Group className="px-0 col-md-10 mb-1" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name='email' placeholder="Enter Your Email address" autoComplete="off" value={this.state.email} onChange={this.handleInput} />
                      </Form.Group>
                      <Form.Group className="px-0 col-md-10 mt-4" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="Enter Your password" autoComplete="off" value={this.state.password} onChange={this.handleInput} />
                      </Form.Group>
                      <Form.Group className="mt-4">
                        <Form.Check type="checkbox" label="Remember Me" />
                      </Form.Group>
                      <div className="d-grid gap-2 mt-5">
                        <Button className='button-rad' style={{ backgroundColor: '#000842' }} size="lg" onClick={this.handle_login}>
                          Submit
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Container>
                {/* <h4 style={{ color: 'white' }}>Your Logo</h4> */}
                {/* <img src='Group 33.svg' /> */}
              </Col>
              <Col lg={6} className='b-img'>
                <div className='d-flex justify-content-center mt-5 h-20 '>
                  <img src='w2s.svg' className='icon'/>


                </div>

              </Col>
            </Row>
          </Container>
        </LoadingOverlay>
      </div>
    )
  }

}
export default Login;