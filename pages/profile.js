import React, { Component } from 'react';
import styles from '../styles/Home.module.css'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import Router from 'next/router'
import Header from './components/header'
import { postMethod, serverUrl, getMethod } from '../properties';
import LoadingOverlay from 'react-loading-overlay';

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      first_name: '',
      last_name: '',

      error_msg: '',
      login_sucess: '',
      loaderisActive: false,
      profile_info: {}
    }
  }
  componentDidMount() {
    this.get_profile_info();
  }
  //function for getting profile details
  get_profile_info = () => {
    this.setState({ loaderisActive: true })
    getMethod(`${serverUrl}users/2`).then(res => {
      if (res.data) {
        this.setState({ loaderisActive: false,profile_info: res.data })
      }
    })
  }
  //function for handle Input values 
  handle_input = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
 
  render() {
    const { profile_info } = this.state
    return (
      <div>
        <Header />
        <LoadingOverlay active={this.state.loaderisActive} spinner >
        <Container fluid className='card d-flex justify-content-center'>
          <Row className='vh-100'>
            <Col lg={12} >
              <Container >
                <div className='container-a'>



                </div>
                <div className=' mt-4'>
                  <h5 className="mt-3  mb-3 ms-5 text-secondary ">MY Account</h5>
                  <div className='box'>
                    <Row>
                      <Col sm={5}>
                        <div className='ms-3 mt-4'>
                          <img src={this.state.profile_info.avatar ? this.state.profile_info.avatar : "profile.png"} alt="Avatar" width="200px" height="200px" /></div>
                        
                      </Col>
                      <Col sm={7}>
                        <Form>
                          <Form.Group className="px-0 col-md-10 mt-4" >
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name='first_name' placeholder="Enter Your Email address" value={this.state.profile_info.first_name} autoComplete="off" maxLength="10" />
                          </Form.Group>
                          <Form.Group className="px-0 col-md-10 mt-4" >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name='last_name' placeholder="Enter Your Email address" value={this.state.profile_info.last_name} autoComplete="off" maxLength="10" />
                          </Form.Group>
                          <Form.Group className="px-0 col-md-10 mb-1" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" name='email' placeholder="Enter Your Email address" disabled={this.state.profile_info ? true : false} value={this.state.profile_info.email} autoComplete="off" maxLength="10" />
                          </Form.Group>


                        </Form>
                      </Col>
                    </Row>
                  </div>



                </div>
              </Container>
              {/* <h4 style={{ color: 'white' }}>Your Logo</h4> */}
              {/* <img src='Group 33.svg' /> */}
            </Col>
            {/* <Col lg={6} className='b-img'>
  
            </Col> */}
          </Row>
        </Container>
        </LoadingOverlay>
      </div>
    )
  }
}
export default Profile;
