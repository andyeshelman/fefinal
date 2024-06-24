import { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CustomerList from "./CustomerList";
import CustomerSheet from "./CustomerSheet";
import CustomerNew from "./CustomerNew";
import api from "../../../public/api";

function Customer() {
  const [selectedCustomerId, setCustomerId] = useState(null)
  const [customers, setCustomers] = useState([])
  const [adding, setAdding] = useState(false)

  useEffect(updateCustomers, [])

  function updateCustomers() {
    api.get("/customers").then(
      response => setCustomers(response.data)
    ).catch(
      error => console.log(error)
    )
  }

  function toAdding() {
    setCustomerId(null)
    setAdding(true)
  }

  function toId(id) {
    setAdding(false)
    setCustomerId(id)
  }

  return (

    <Container>
      <Row className="g-3">
        <Col md={6} xl={4}>
          <CustomerList customers={customers} setCustomerId={toId} toAdding={toAdding}/>
        </Col>
        <Col md={6} xl={4}>
          {selectedCustomerId && <CustomerSheet customerId={selectedCustomerId} setCustomerId={setCustomerId} updateCustomers={updateCustomers} />}
          {adding && <CustomerNew setAdding={setAdding} updateCustomers={updateCustomers} />}
        </Col>
      </Row>
    </Container>

  )
}

export default Customer
