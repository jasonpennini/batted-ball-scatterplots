import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PlayDetailsModal = ({ show, onHide, selectedData }) => {
  const formatPitcherName = (name) => {
    if (!name) return 'N/A'; 
    const [lastName, firstName] = name.split(', ');
    return `${firstName} ${lastName}`;
  };

  const formatPlayOutcome = (outcome) => {
    if (outcome === "Undefined") {
      return "Foul or HBP"; 
    }
    
    if (outcome === "HomeRun") {
      return "Home Run"; 
    }
    
    return outcome; 
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Play Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedData ? ( 
          <>
            <p><strong>Play Outcome:</strong> {formatPlayOutcome(selectedData.playOutcome)}</p>
            <p><strong>Pitcher:</strong> {formatPitcherName(selectedData.pitcher)}</p>
            <p><strong>Exit Speed:</strong> {selectedData.x}</p>
            <p><strong>Launch Angle:</strong> {selectedData.y}</p>
            <p><strong>Hit Distance:</strong> {selectedData.hitDistance}</p>
            <p>
              <strong>Full Screen Video: </strong> 
              {selectedData.videoLink ? (
                <a href={selectedData.videoLink} target="_blank" rel="noopener noreferrer">Link</a>
              ) : (
                ' N/A'
              )}
            </p>
            {selectedData.videoLink && (
              <div style={{ marginTop: '10px' }}>
                <iframe
                  width="448"
                  height="245"
                  src={selectedData.videoLink}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded Video"
                />
              </div>
            )}
          </>
        ) : (
          <p>No data available.</p> 
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlayDetailsModal;
