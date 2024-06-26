import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const LaptopModal = ({ show, onHide, laptop }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Laptop Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {laptop?.id}</p>
        <p><strong>Brand:</strong> {laptop?.brand}</p>
        <p><strong>Model:</strong> {laptop?.model}</p>
        <p><strong>Processor:</strong> {laptop?.processor}</p>
        <p><strong>RAM:</strong> {laptop?.ram}</p>
        <p><strong>Storage:</strong> {laptop?.storage}</p>
        <p><strong>Price:</strong>$ {laptop?.price}</p>
        <p><strong>Release Date:</strong> {laptop?.release_date}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LaptopModal;