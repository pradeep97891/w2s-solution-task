import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Header from './components/header';
import {AgGridReact} from 'ag-grid-react';
import LoadingOverlay from 'react-loading-overlay';
import { postMethod, serverUrl, getMethod, deleteMethod } from '../properties';

class Dashboard extends React.Component {
 
        constructor(props) {
            super(props);
    
            this.state = {
                columnDefs: [
                    {headerName: "Id", field: "id",width:100},
                    {headerName: "User Name", field: "name",width:300},
                    {headerName: "Roles", field: "role_name",width:300},
                    {headerName: "Role assigned year", field: "year",width:300},
                    {headerName: "value of role", field: "pantone_value",width:300},
                   
    
                ],
                rowData: [
                   
                ]
            }
        }
        componentDidMount() {
            this.get_role_list();
        }
    
        //get User list 
        get_role_list = () => {
            this.setState({ loaderisActive: true })
            getMethod(`${serverUrl}unknown`).then(res => {
                if (res.data) {
                    res.data?.map(item=>{
                        item.role_name = "edit,view,add,delete"
                    })
                    this.setState({ loaderisActive: false, rowData: res.data })
                }
            })
        }
    render() {
        return (
            <div>
                <Header />
                <Container className='d-flex justify-content-between'>
                <h3 className='mt-4 text-secondary'>Dashboard</h3>
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
            </div>
        )
    }
}
export default Dashboard;