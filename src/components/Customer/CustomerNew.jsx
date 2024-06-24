import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import api from '../../../public/api';

function CustomerNew({ setAdding, updateCustomers }) {

  const [customerData, setCustomerData] = useState({})
  const [validated, setValidated] = useState(false);

  function handleSubmit() {
    const form = document.getElementById("customerFormNew")

    if (form.checkValidity() === false){
      setValidated(true); 
    } else {
      api.post("/customers", customerData).then( response => {
        console.log(response)
        updateCustomers()
      }).catch( error => {
        console.log(error)
      })
      setAdding(false)
    }
  }

  function customerChange(event){
    const { name, value } = event.target;
    setCustomerData({ ...customerData, [name]: value })
  }

  return (
    <Container className="panel">
      <Row>
        <Col xs={7}>
          <h3>New Customer</h3>
        </Col>
        <Col xs={2}>
          <Button variant="outline-info" onClick={handleSubmit}>Save</Button>
        </Col>
        <Col xs={3}>
          <Button variant="outline-danger" onClick={() => setAdding(false)}>Cancel</Button>
        </Col>
      </Row>
      <Form data-bs-theme="dark" id="customerFormNew" noValidate validated={validated}>
        <Form.Group as={Row} className="">
          <Form.Label column xs={3}>Name:</Form.Label>
          <Col xs={9}>
            <Form.Control type="text" name="name" onChange={customerChange}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="">
          <Form.Label column xs={3}>Email:</Form.Label>
          <Col xs={9}>
            <Form.Control type="email" name="email" pattern="\w[.\w]*@([\w]+\.)+\w+" onChange={customerChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="">
          <Form.Label column xs={3}>Phone:</Form.Label>
          <Col xs={9}>
            <Form.Control type="text" name="phone" pattern="[\d]{3}\D?[\d]{3}\D?[\d]{4}" onChange={customerChange} />
          </Col>
        </Form.Group>
      </Form>
    </Container>
  )

}

export default CustomerNew
