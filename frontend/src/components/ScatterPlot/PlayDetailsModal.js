// src/components/ScatterPlot/PlayDetailsModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

// src/components/ScatterPlot/PlayDetailsModal.js
const PlayDetailsModal = ({ show, onHide, selectedData }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Play Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {selectedData ? ( // Check if selectedData exists
        <div>
          <p><strong>Play Outcome:</strong> {selectedData.playOutcome}</p>
          <p><strong>Pitcher:</strong> {selectedData.pitcher}</p>
          <p><strong>Exit Speed:</strong> {selectedData.x}</p>
          <p><strong>Launch Angle:</strong> {selectedData.y}</p>
          <p><strong>Hit Distance:</strong> {selectedData.hitDistance}</p>
          <p>
            <strong>Video Link:</strong>{' '}
            <a href={selectedData.videoLink} target="_blank" rel="noopener noreferrer">
              Watch Video
            </a>
          </p>
        </div>
      ) : (
        <p>No data available.</p> // Fallback message for empty data
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default PlayDetailsModal;
