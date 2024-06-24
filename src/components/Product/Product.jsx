import { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProductList from "./ProductList";
import ProductSheet from "./ProductSheet";
import ProductNew from "./ProductNew";

import api from "../../../public/api";


function Product() {

  const [selectedProductId, setProductId] = useState(null)
  const [products, setProducts] = useState([])
  const [adding, setAdding] = useState(false)

  useEffect(updateProducts, [])

  function updateProducts() {
    api.get("/products").then(
      response => setProducts(response.data)
    ).catch(
      error => console.log(error)
    )
  }

  function toAdding() {
    setProductId(null)
    setAdding(true)
  }

  function toId(id) {
    setAdding(false)
    setProductId(id)
  }

  return (
    <Container>
      <Row className="g-3">
        <Col md={6} xl={4}>
          <ProductList products={products} setProductId={toId} toAdding={toAdding}/>
        </Col>
        <Col md={6} xl={4}>
          {selectedProductId && <ProductSheet productId={selectedProductId} setProductId={setProductId} updateProducts={updateProducts} />}
          {adding && <ProductNew setAdding={setAdding} updateProducts={updateProducts} />}
        </Col>
      </Row>
    </Container>
  )
}

export default Product
