import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Nav, Navbar, NavDropdown, Modal } from 'react-bootstrap'
import Header from './components/header';
import { AgGridReact } from 'ag-grid-react';
import { postMethod, serverUrl, getMethod, deleteMethod } from '../properties';
import LoadingOverlay from 'react-loading-overlay';

class UserManagement extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            edit_show_modal: false,
            first_name: '',
            last_name: '',
            email: '',
            loaderisActive: false,
            columnDefs: [
                { headerName: "Id", field: "id", width: 100 },
                { headerName: "First Name", field: "first_name", width: 300 },
                { headerName: "Last Name", field: "last_name", width: 300 },
                { headerName: "Email", field: "email", width: 400 },

                {
                    headerName: "EDIT", field: "violations", width: 100, sortable: true, cellRendererFramework: (params) => {
                        return (<div onClick={() => this.edit_user(params.data)}><img height="20" width="20" src="emp-edit.png" style={{ cursor: 'pointer' }} />
                        </div>)
                    }
                },
                {
                    headerName: "DELETE", field: "violations", width: 100, sortable: true, cellRendererFramework: (params) => {
                        return (<div onClick={() => this.delete_user(params.data)}><img height="20" width="20" src="emp-del.png" style={{ cursor: 'pointer' }} />
                        </div>)
                    }
                },

            ],
            rowData: [],
            profile_info: {}
        }
    }

    componentDidMount() {
        this.get_user_list();
    }

    //get User list 
    get_user_list = () => {
        this.setState({ loaderisActive: true })
        getMethod(`${serverUrl}users?page=2`).then(res => {
            if (res.data) {
                this.setState({ loaderisActive: false, rowData: res.data })
            }
        })
    }
    //to add the user 
    add_user = () => {
        if ((this.state.first_name).trim() === '') {
            this.setState({
                error_msg: 'Please enter your first name'
            })
            return false;

        }
        if ((this.state.last_name).trim() === '') {
            this.setState({
                error_msg: 'Please enter your last name'
            })
            return false;
        }
        if ((this.state.email).trim() === '') {
            this.setState({
                error_msg: 'Please enter your email'
            })
            return false;
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))) {
            this.setState({
                error_msg: "Please enter a valid Email - id"
            })
            return false
        }

        const params = {

            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "email": this.state.email

        }
        this.setState({ loaderisActive: true, })
        postMethod(`${serverUrl}users`, params).then(res => {
            if (res.data) {
                this.setState({ loaderisActive: false, showModal: false })
                alert("added successfully")
                this.get_user_list();
            }
        })
    }
    //to edit the user data
    edit_user = (params) => {
        this.setState({ loaderisActive: true, edit_show_modal: true, id: params.id })
        getMethod(`${serverUrl}users/${params.id}`).then(res => {
            if (res.data) {
                this.setState({ first_name: res.data.first_name, last_name: res.data.last_name, profile_info: res.data, loaderisActive: false })
            }
        })
    }
    //to update the user
    update_user = (params) => {
        if ((this.state.first_name).trim() === '') {
            this.setState({
                error_msg: 'Please enter your first name'
            })
            return false;

        }
        if ((this.state.last_name).trim() === '') {
            this.setState({
                error_msg: 'Please enter your last name'
            })
            return false;
        }
        this.setState({ loaderisActive: true, })
        const param = {

            "first_name": this.state.first_name,
            "last_name": this.state.last_name


        }
        getMethod(`${serverUrl}users/${this.state.id}`, param).then(res => {
            if (res) {
                alert('updated successfully')
                this.setState({ loaderisActive: false, edit_show_modal: false })

                this.get_user_list();
            }
        })
    }
    //to delete the user 
    delete_user = (params) => {
        this.setState({ loaderisActive: true })
        deleteMethod(`${serverUrl}users/${params.id}`).then(res => {
            this.setState({ loaderisActive: false })
            alert('Deleted Successfully')
            this.get_user_list();
        })
    }
    //to handle the input values
    handle_input = (e) => {
        this.setState({ [e.target.name]: e.target.value, error_msg: '' })
    }
    //to close the modal
    handleClose = () => {
        this.setState({ showModal: false, edit_show_modal: false, first_name: '', last_name: '', email: '' })
    }
    render() {
        let error_display = 'none';
        if (this.state.error_msg != '') {
            error_display = 'block';
        }
        return (
            <div>
                <Header />
                <LoadingOverlay active={this.state.loaderisActive} spinner >
                    <Container className='d-flex justify-content-between'>
                        <h3 className='mt-4 text-secondary'>User Management</h3>
                        <Button className='p-0 mt-3 w-10' onClick={() => { this.setState({ showModal: true }) }} style={{ backgroundColor: '#000842' }}>Add User</Button>
                    </Container>

                    <Container >
                        <Row>
                            <Col lg={12}>
                                <div >
                                    <div
                                        className="ag-theme-material"
                                        style={{
                                            height: '500px',
                                            width: '1400px'
                                        }}
                                    >
                                        <AgGridReact
                                            columnDefs={this.state.columnDefs}
                                            rowData={this.state.rowData}>
                                        </AgGridReact>
                                    </div>
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </LoadingOverlay>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ display: error_display, textAlign: "center", color: 'red', marginBottom: '5px' }}>{this.state.error_msg}</div>

                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="John Smith"
                                    autoFocus
                                    name='first_name'
                                    value={this.state.first_name}
                                    onChange={this.handle_input}
                                />            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="John Smith"
                                    autoFocus
                                    name='last_name'
                                    value={this.state.last_name}
                                    onChange={this.handle_input}
                                />            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name='email'
                                    placeholder="name@example.com"
                                    autoFocus
                                    value={this.state.email}
                                    onChange={this.handle_input}
                                />
                            </Form.Group>




                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" style={{ backgroundColor: '#000842' }} onClick={this.add_user}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.edit_show_modal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ display: error_display, textAlign: "center", color: 'red', marginBottom: '5px' }}>{this.state.error_msg}</div>

                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='first_name'
                                    placeholder="John Smith"
                                    autoFocus

                                    value={this.state.first_name}
                                    onChange={this.handle_input}
                                />            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='last_name'
                                    placeholder="John Smith"
                                    autoFocus
                                    value={this.state.last_name}
                                    onChange={this.handle_input}


                                />            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="John Smith"
                                    autoFocus
                                    disabled={this.state.profile_info.email ? true : false}
                                    value={this.state.profile_info.email}


                                />            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" style={{ backgroundColor: '#000842' }} onClick={this.update_user}>
                            update Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default UserManagement;