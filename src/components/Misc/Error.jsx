import Modal from "react-bootstrap/Modal";

function Error({ show, setShow, type, message}) {
  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title>{type}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Error
