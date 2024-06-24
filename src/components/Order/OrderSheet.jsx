import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

import api from '../../../public/api';

function OrderSheet({ orderId }) {
  const [details, setDetails] = useState({
    order: {},
    products: []
  })

  useEffect( () => {
    api.get(`/orders/${orderId}`).then(
      response => {setDetails(response.data)
        console.log("response")
      }
    ).catch(
      error => console.log(error)
    )
  }, [orderId])

  return (
    <Container className="panel border rounded p-2">
      <h3>Order ID: {orderId}</h3>
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
