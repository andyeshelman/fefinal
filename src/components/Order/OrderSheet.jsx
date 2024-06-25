import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';

import api from '../../../public/api';

function OrderSheet({ orderId, setOrderId, updateOrders }) {
  const [details, setDetails] = useState({
    order: {},
    products: []
  })

  useEffect( () => {
    api.get(`/orders/${orderId}`).then(
      response => {setDetails(response.data)
      }
    ).catch(
      error => console.log(error)
    )
  }, [orderId])

  function handleDelete() {
    api.delete(`/orders/${orderId}`).then(
      response => {
        console.log(response)
        updateOrders()
        setOrderId(null)
      }
    ).catch(
      error => console.log(error)
    )
  }

  return (
    <Container className="panel border rounded p-2">
      <Row>
        <Col xs={8}>
          <h3>Order ID: {orderId}</h3>
        </Col>

        <Col xs={2}>
          <Button variant="outline-danger" onClick={handleDelete}>
            Del
          </Button>
        </Col>
      </Row>
      <Stack>
        <div className="p-2">Customer ID: {details.order.customer_id}</div>
        <div className="p-2">Date: {details.order.date}</div>
        <div className="p-2">Subtotal: {details.total_price}</div>
        <div className="p-2">Quantity: {details.total_quantity}</div>
      </Stack>
      <h3>Products</h3>
      <ListGroup className="lists" data-bs-theme="dark">
        {details.products.map( product =>
          <ListGroup.Item key={product.product_id}>
            {product.name}, {product.quantity} &times; {product.price}
          </ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  )
}

export default OrderSheet
