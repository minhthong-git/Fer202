import React from "react";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import { Row, Col } from "react-bootstrap";
import { movies } from "../data/movies";
import MovieCard from "../components/MovieCard/MovieCard";
import Filter from "../components/Filter/Filter";

export default function HomePage() {
  return (
    <div>
      <HomeCarousel />
      <div className="mt-4">
        <h4>Featured Movies Collections</h4>
        
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          {movies.map((movie) => (
            <Col key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}