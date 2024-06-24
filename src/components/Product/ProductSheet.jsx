import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'

import api from '../../../public/api';

function ProductSheet({ productId, setProductId, updateProducts }) {

  const [editing, setEditing] = useState(false)
  const [details, setDetails] = useState({})
  const [productData, setProductData] = useState({})
  const [validated, setValidated] = useState(false);
  
  useEffect(updateDetails, [productId])

  function updateDetails () {
    api.get("/products").then(
      response => {
        setDetails(response.data.find(product => product.product_id == productId))
        setProductData({})
        document.getElementById("productForm").reset()
      }
    ).catch(
      error => console.log(error)
    )
  }

  function handleSubmit() {
    const form = document.getElementById("productForm")

    if (form.checkValidity() === false){
      setValidated(true); 
    } else {
      api.put(`/products/${productId}`, productData).then( response => {
        console.log(response)
        updateDetails()
        updateProducts()
      }).catch( error => {
        console.log(error)
      })
      setEditing(false)
    }
  }

  function handleDelete() {
    api.delete(`/products/${productId}`).then(
      response => {console.log(response)
        updateProducts()
        setProductId(null)
      }
    ).catch(
      error => console.log(error)
    )
  }

  function productChange(event){
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value })
  }

  return (
    <Container className="panel border rounded p-2">
      <Row>
        <Col xs={8}>
          <h3>Product ID: {details.product_id}</h3>
        </Col>
        <Col xs={2}>
          {
            editing ?
            <Button variant="outline-info" onClick={handleSubmit}>Save</Button> :
            <Button variant="outline-info" onClick={() => setEditing(true)}>Edit</Button>
          }
        </Col>
        <Col xs={2}>
          <Button variant="outline-danger" onClick={handleDelete}>
            Del
          </Button>
        </Col>
      </Row>
      <Form data-bs-theme="dark" id="productForm" noValidate validated={validated}>
        <Form.Group as={Row} className="">
          <Form.Label column xs={3}>Name:</Form.Label>
          <Col xs={9}>
            <Form.Control type="text" name="name" plaintext={!editing} readOnly={!editing} defaultValue={details.name} onChange={productChange}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="">
          <Form.Label column xs={3}>Price:</Form.Label>
          <Col xs={9}>
            <Form.Control type="text" name="price" plaintext={!editing} readOnly={!editing} defaultValue={details.price} pattern="\d*(\.\d{2})?" onChange={productChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="">
          <Form.Label column xs={3}>Stock:</Form.Label>
          <Col xs={9}>
            <Form.Control type="number" name="stock" plaintext={!editing} readOnly={!editing} defaultValue={details.stock} onChange={productChange} />
          </Col>
        </Form.Group>
      </Form>

    </Container>
  )
}

export default ProductSheet
