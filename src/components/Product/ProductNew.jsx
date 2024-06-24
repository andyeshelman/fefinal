import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import api from '../../../public/api';

function ProductNew({ setAdding, updateProducts}) {
  const [productData, setProductData] = useState({})
  const [validated, setValidated] = useState(false);

  function handleSubmit() {
    const form = document.getElementById("productFormNew")

    if (form.checkValidity() === false){
      setValidated(true); 
    } else {
      api.post("/products", productData).then( response => {
        console.log(response)
        updateProducts()
        setAdding(false)
      }).catch( error => {
        console.log(error)
      })
    }
  }

  function productChange(event){
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value })
  }

  return (
    <Container className="panel">
      <Row>
        <Col xs={7}>
          <h3>New Product</h3>
        </Col>
        <Col xs={2}>
          <Button variant="outline-info" onClick={handleSubmit}>Save</Button>
        </Col>
        <Col xs={3}>
          <Button variant="outline-danger" onClick={() => setAdding(false)}>Cancel</Button>
        </Col>
      </Row>
      <Form data-bs-theme="dark" id="productFormNew" noValidate validated={validated}>
        <Form.Group as={Row} className="">
          <Form.Label column xs={3}>Name:</Form.Label>
          <Col xs={9}>
            <Form.Control type="text" name="name" onChange={productChange}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="">
          <Form.Label column xs={3}>Price:</Form.Label>
          <Col xs={9}>
            <Form.Control type="text" name="price" pattern="\d*(\.\d{2})?" onChange={productChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="">
          <Form.Label column xs={3}>Stock:</Form.Label>
          <Col xs={9}>
            <Form.Control type="number" name="stock" onChange={productChange} />
          </Col>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default ProductNew
