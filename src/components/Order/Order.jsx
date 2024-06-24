import { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import OrderList from "./OrderList";
import OrderSheet from "./OrderSheet";
import OrderNew from "./OrderNew";

import api from "../../../public/api";

function Order() {
  const [selectedOrderId, setOrderId] = useState(null)
  const [orders, setOrders] = useState([])
  const [adding, setAdding] = useState(false)

  useEffect(updateOrders, [])

  function updateOrders() {
    api.get("/orders").then(
      response => setOrders(response.data)
    ).catch(
      error => console.log(error)
    )
  }

  function toAdding() {
    setOrderId(null)
    setAdding(true)
  }

  function toId(id) {
    setAdding(false)
    setOrderId(id)
  }

  return (
    <Container>
      <Row className="g-3">
        <Col md={6} xl={4}>
          <OrderList orders={orders} setOrderId={toId} toAdding={toAdding} />
        </Col>
        <Col md={6} xl={4}>
          {selectedOrderId && <OrderSheet orderId={selectedOrderId} setOrderId={setOrderId} updateOrders={updateOrders} />}
          {adding && <OrderNew setAdding={setAdding} updateOrders={updateOrders} />}
        </Col>
      </Row>
    </Container>
  )
}

export default Order
