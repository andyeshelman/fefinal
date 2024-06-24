import { useState } from "react"
import { useNavigate } from "react-router-dom";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";

import api from "../../../public/api";

function Signup() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({})
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("Success!");

  function handleChange(event){
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    if (form.checkValidity() === false){
      event.stopPropagation(); //stop the event from doing anything further
      setValidated(true); 
    } else {


      api.post("/customers", formData).then( response => {
        console.log(response)
        setMessage(`Successfully Added Customer: ${formData.name}`)
      }).catch( error => {
        console.log(error)
        setMessageType("Error")
        setMessage("Error Adding User to the Server. Please Try Again")
      })
    
      setShow(true)
    }
  }

  function handleClose() {
    setShow(false)
    navigate('/customers')
  }

  return (
    <Container>
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="border border-white rounded p-4">
      <h3>Signup</h3>
      <FloatingLabel
        htmlFor="name"
        label="Name"
        className="mb-3 text-dark"
      >
        <Form.Control type="text" id="name" name="name" placeholder="Name here" onChange={handleChange} required/>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">Please Enter a Valid Name</Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel
        htmlFor="email"
        label="Email"
        className="mb-3 text-dark"
      >
        <Form.Control type="email" id="email" name="email" pattern="\w[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)" placeholder="Email here" onChange={handleChange} required/>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">Please Enter a Valid Email</Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel
        htmlFor="phone"
        label="Phone"
        className="mb-3 text-dark"
      >
        <Form.Control type="text" id="phone" name="phone" pattern="[\d]{3}\D?[\d]{3}\D?[\d]{4}" placeholder="Phone here" onChange={handleChange} required/>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">Please Enter a Valid Phone Number</Form.Control.Feedback>
      </FloatingLabel>

      <Button type="submit" className="btn btn-primary w-25" >Submit</Button>
    </Form>
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{messageType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Signup
