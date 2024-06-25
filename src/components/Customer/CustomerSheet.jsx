import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';

import api from '../../../public/api';

function CustomerSheet({ customerId, setCustomerId, updateCustomers }) {
  const [editing, setEditing] = useState(false)
  const [details, setDetails] = useState({
    customer: {},
    account: {},
    orders: []
  })
  const [customerData, setCustomerData] = useState({})
  const [validated, setValidated] = useState(false);
  
  useEffect(updateDetails, [customerId])

  function updateDetails () {
    api.get(`/customers/${customerId}`).then(
      response => {
        setDetails(response.data)
        setCustomerData({})
        document.getElementById("customerForm").reset()
      }
    ).catch(
      error => console.log(error)
    )
  }

  function handleSubmit() {
    const form = document.getElementById("customerForm")

    if (form.checkValidity() === false){
      setValidated(true); 
    } else {
      api.put(`/customers/${customerId}`, customerData).then( response => {
        console.log(response)
        updateDetails()
        updateCustomers()
      }).catch( error => {
        console.log(error)
      })
      setEditing(false)
    }
  }

  function handleDelete() {
    api.delete(`/customers/${customerId}`).then(
      response => {
        console.log(response)
        updateCustomers()
        setCustomerId(null)
      }
    ).catch(
      error => console.log(error)
    )
  }

  function customerChange(event){
    const { name, value } = event.target;
    setCustomerData({ ...customerData, [name]: value })
  }


  return (
    <Container className="panel border rounded p-2">
      <Row>
        <Col xs={8}>
          <h3>Customer ID: {customerId}</h3>
        </Col>
        <Col xs={2}>
          {
            editing ?
            <Button variant="outline-info" onClick={handleSubmit}>Save</Button> :
            <Button variant="outline-info" onClick={() => setEditing(true)}>Edit</Button>
          }
        </Col>
        <Col xs={2}>
          <Button variant="outline-danger" onClick={handleDelete}>
            Del
          </Button>
        </Col>
      </Row>
      <Form data-bs-theme="dark" id="customerForm" noValidate validated={validated}>
        <Form.Group as={Row} className="">
          <Form.Label column xs={3}>Name:</Form.Label>
          <Col xs={9}>
            <Form.Control type="text" name="name" plaintext={!editing} readOnly={!editing} defaultValue={details.customer.name} onChange={customerChange}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="">
          <Form.Label column xs={3}>Email:</Form.Label>
          <Col xs={9}>
            <Form.Control type="email" name="email" plaintext={!editing} readOnly={!editing} defaultValue={details.customer.email} pattern="\w[.\w]*@([\w]+\.)+\w+" onChange={customerChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="">
          <Form.Label column xs={3}>Phone:</Form.Label>
          <Col xs={9}>
            <Form.Control type="text" name="phone" plaintext={!editing} readOnly={!editing} pattern="[\d]{3}\D?[\d]{3}\D?[\d]{4}" defaultValue={details.customer.phone} onChange={customerChange} />
          </Col>
        </Form.Group>
      </Form>
      <h3>Orders</h3>
      <ListGroup className='border' data-bs-theme="dark">
        {details.orders.map( order =>
          <ListGroup.Item key={order.order_id}>ID: {order.order_id}, Date: {order.date}</ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  )
}

export default CustomerSheet
