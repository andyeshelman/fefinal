import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";

function OrderList({ orders, setOrderId, toAdding }) {
  const handleClickOrder = id => () => setOrderId(id)

  return (
    <Container className="panel border rounded p-2">
      <Row>
        <Col xs={9}>
          <h3>Orders</h3>
        </Col>
        <Col xs={3}>
          <Button variant="outline-info" onClick={toAdding}>Add</Button>
        </Col>
      </Row>
      <ListGroup className="" data-bs-theme="dark">
        {orders.map(order =>
          <Container key={order.order_id} className="mb-1">
            <ListGroup.Item action onClick={handleClickOrder(order.order_id)} className="rounded border">
              ID: {order.order_id}, Date: {order.date}
            </ListGroup.Item>
          </Container>
        )}
      </ListGroup>
    </Container>
  )
}

export default OrderList
