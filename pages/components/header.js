import { Container, Row, Col, Form, Button, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import React, { Component, useState } from 'react';
import Link from 'next/link'
import Router from 'next/router'
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.SideNavigation = React.createRef();
        this.state = {
            sideNavVisible: false,
            pathname: '',
        }

    }
    logout = () => {
        localStorage.clear();
        Router.push('/')
    }



render() {
    return (
        <>
            <div>
                <Navbar expand="lg" style={{ backgroundColor: '#000842' }}>
                    <Container fluid>
                        <Navbar.Brand href="/dashboard" className='nav-color '> <img src='w2s.svg' width="175px" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link href="/dashboard" className='nav-color'>Dashboard</Nav.Link>
                                <Nav.Link href="/userManagement" className='nav-color' >User Management</Nav.Link>

                            </Nav>
                            <div > <img onClick={() => { Router.push('/profile') }} className='profile-img' src='profile.svg' /></div>

                            <Button variant="outline-success" onClick={this.logout}>Logout</Button>

                        </Navbar.Collapse>
                    </Container>
                </Navbar></div>
        </>
    )

}
}

export default Header;
