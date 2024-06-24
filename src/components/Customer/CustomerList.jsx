import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";

function CustomerList({ customers, setCustomerId, toAdding }) {

  const handleClickCustomer = id => () => setCustomerId(id)

  return (
    <Container className="panel border rounded p-2">
      <Row>
        <Col xs={9}>
          <h3>Customers</h3>
        </Col>
        <Col xs={3}>
          <Button variant="outline-info" onClick={toAdding}>Add</Button>
        </Col>
      </Row>
      <ListGroup className="" data-bs-theme="dark">
        {customers.map( customer =>
          <Container key={customer.customer_id} className="mb-1">
            <ListGroup.Item action onClick={handleClickCustomer(customer.customer_id)} className="rounded border">
              {customer.name}
            </ListGroup.Item>
          </Container>
        )}
      </ListGroup>
    </Container>
  )
}

export default CustomerList
