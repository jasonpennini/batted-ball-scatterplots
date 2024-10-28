// src/components/ScatterPlot/PlayDetailsModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PlayDetailsModal = ({ show, onClose, data }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Play Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {data && (
        <div>
          <p><strong>Play Outcome:</strong> {data.playOutcome}</p>
          <p><strong>Pitcher:</strong> {data.pitcher}</p>
          <p><strong>Exit Speed:</strong> {data.x}</p>
          <p><strong>Launch Angle:</strong> {data.y}</p>
          <p><strong>Hit Distance:</strong> {data.hitDistance}</p>
          <p>
            <strong>Video Link:</strong>{' '}
            <a href={data.videoLink} target="_blank" rel="noopener noreferrer">
              Watch Video
            </a>
          </p>
        </div>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default PlayDetailsModal;
