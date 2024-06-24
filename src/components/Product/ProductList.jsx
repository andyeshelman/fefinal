import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";

function ProductList({ products, setProductId, toAdding }) {

  const handleClickProduct = id => () => setProductId(id)

  return (
    <Container className="panel border rounded p-2">
      <Row>
        <Col xs={9}>
          <h3>Products</h3>
        </Col>
        <Col xs={3}>
          <Button variant="outline-info" onClick={toAdding}>Add</Button>
        </Col>
      </Row>
      <ListGroup className="" data-bs-theme="dark">
        {products.map(product =>
          <Container key={product.product_id} className="mb-1">
            <ListGroup.Item action onClick={handleClickProduct(product.product_id)} className="rounded border">
              {product.name}
            </ListGroup.Item>
          </Container>
        )}
      </ListGroup>
    </Container>
  )
}

export default ProductList
