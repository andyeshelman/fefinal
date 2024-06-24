import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { ListGroup } from 'react-bootstrap';

import api from '../../../public/api';

function OrderNew({ setAdding, updateOrders }) {
  const [validated, setValidated] = useState(false);
  const [customerIds, setCustomerIds] = useState([])
  const [products, setProducts] = useState([])

  useEffect(getCustomerIds, [])
  useEffect(getProducts, [])

  function getCustomerIds() {
    api.get("/customers").then( response =>
      setCustomerIds(response.data.map(customer => customer.customer_id))
    ).catch(
      error => console.log(error)
    )
  }

  function getProducts(){
    api.get("/products").then(
      response => setProducts(response.data)
    ).catch(
      error => console.log(error)
    )
  }

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target;
    let productData = []
    for (const [key, value] of Object.entries(form.elements)) {
      if (key.startsWith("product")) {
        productData = [...productData, ...Array(+value.value).fill(+key.slice(7))]
      }
    }
    const data = {
      customer_id: form.elements.customer_id.value,
      date: form.elements.date.value,
      product_ids: productData
    }
    if (form.checkValidity() === false){
      setValidated(true); 
    } else {
      api.post("/orders", data).then( response => {
        console.log(response)
        updateOrders()
      }).catch( error => {
        console.log(error)
      })
      setAdding(false)
    }
  }

  const blockScroll = (e) => {
    // Prevent the input value change
    e.target.blur()

    // Prevent the page/container scrolling
    e.stopPropagation()

    // Refocus immediately, on the next tick (after the current function is done)
      setTimeout(() => {
        e.target.focus()
    }, 0)
}

  return (
    <Container className="panel border rounded p-2">
      <Row>
        <Col xs={7}>
          <h3>New Order</h3>
        </Col>
        <Col xs={2}>
          <Button variant="outline-info" form='orderFormNew' type='submit'>Save</Button>
        </Col>
        <Col xs={3}>
          <Button variant="outline-danger" onClick={() => setAdding(false)}>Cancel</Button>
        </Col>
      </Row>
      <Form data-bs-theme="dark" id="orderFormNew" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} className="">
          <Form.Label column xs={3}>Customer ID:</Form.Label>
          <Col xs={9}>
            <Form.Select name="customer_id">
              {customerIds.map(id => 
                <option key={id} value={id}>{id}</option>
              )}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="">
          <Form.Label column xs={3}>Date:</Form.Label>
          <Col xs={9}>
            <Form.Control type="date" name="date" />
          </Col>
        </Form.Group>
        <ListGroup className="border" data-bs-theme="dark">
          {products.map( product =>
            <ListGroup.Item key={product.product_id}>
              <Row>
              <Form.Label column xs={9}>{product.name}</Form.Label>
              <Col xs={3}>
                <Form.Control type="number" name={`product${product.product_id}`} min={0} max={product.stock} onWheel={blockScroll} />
              </Col></Row>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Form>
    </Container>
  )
}

export default OrderNew
