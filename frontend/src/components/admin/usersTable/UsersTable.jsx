import React from "react";
import Button from 'react-bootstrap/Button';
import { Row } from "react-bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';


export default function UsersTable() {

  return (
    <>
      <div className="col-md-9 gedf-main" style={{ overflow: 'auto', maxHeight: '100vh' }}>
        <Row className="p-5" >
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Image</th>
                <th scope='col'>Name</th>
                <th scope='col'>Email</th>
                <th scope='col'> <span style={{marginLeft:"20%"}}></span> Block</th>
                <th scope='col'> <span style={{marginLeft:"20%"}}></span> Edit</th>
                <th scope='col'> <span style={{marginLeft:"20%"}}></span> Delete</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <th scope='row'>1</th>
                <td>{<img alt='' style={{ objectFit: 'cover', border: '2px solid black', borderRadius: '50%' }} width="30px" height="30px"></img>}</td>
                <td>Email</td>
                <td>Otto</td>
                <td style={{width:"100px"}}>
                  <Button variant='warning' style={{width:"100px", height:"30px", fontSize:"small"}} 
                   
                  >Block</Button>
                </td>
                <td style={{width:"100px"}}>
                  <Button variant='success' style={{width:"100px", height:"30px", fontSize:"small"}} 
                  >Edit</Button>
                </td>
                <td style={{width:"100px"}}>
                  <Button variant='danger' style={{width:"100px", height:"30px", fontSize:"small"}} 
                  >Delete</Button>
                </td>
              </tr>
              {/* <tr>
                <th scope='row'>2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope='row'>3</th>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr> */}
            </MDBTableBody>
          </MDBTable>
        </Row>
      </div>
    </>
  );
}
