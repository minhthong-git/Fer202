import React, { useState } from 'react';
import { Card, Button, Badge, Modal, Toast, ToastContainer } from 'react-bootstrap';

export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddToFavourites = () => {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    
    if (!favourites.some(fav => fav.id === movie.id)) {
      const newFavourites = [...favourites, movie];
      localStorage.setItem('favourites', JSON.stringify(newFavourites));
    }

    setShowToast(true);
  };

  const shortDescription = movie.description.length > 100
    ? movie.description.substring(0, 100) + '...'
    : movie.description;

  return (
    <>
      <Card className="h-100">
        <Card.Img 
          variant="top" 
          src={movie.poster} 
          alt={movie.title} 
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>
            <Badge bg="secondary">{movie.year}</Badge> {movie.country} - {movie.duration} phút
          </Card.Text>
          <Card.Text>{shortDescription}</Card.Text>
          <Badge bg="info" className="text-dark">{movie.genre}</Badge>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" className="me-2" onClick={handleShowModal}>Details</Button>
          <Button variant="success" onClick={handleAddToFavourites}>Add to Favourites</Button>
        </Card.Footer>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={movie.poster} alt={movie.title} className="img-fluid mb-3" />
          <h5>Mô tả đầy đủ</h5>
          <p>{movie.full_description}</p>
          <h5>Suất chiếu</h5>
          <ul>
            {movie.showtimes.map((time, index) => <li key={index}>{time}</li>)}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-end" className="p-3">
        <Toast 
          onClose={() => setShowToast(false)} 
          show={showToast} 
          delay={3000} 
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Added to favourites!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}