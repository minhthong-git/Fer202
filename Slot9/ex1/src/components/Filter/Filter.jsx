import { Card, Form, Row, Col } from "react-bootstrap";

export default function Filter() {
    return (
        <Card className="p-3 mb-4">
            <Row className="g-3">
                {/* Search by Title or Description */}
                <Col md={6}>
                    <Form.Group>
                        <Form.Label><strong>Search by Title or Description</strong></Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="e.g., Galactic Wars, epic space battles..." 
                        />
                    </Form.Group>
                </Col>

                {/* Filter by Year */}
                <Col md={3}>
                    <Form.Group>
                        <Form.Label><strong>Filter by Year</strong></Form.Label>
                        <Form.Select>
                            <option value="all">All Years</option>
                            <option value="before-2000">Before 2000</option>
                            <option value="2001-2015">2001-2015</option>
                            <option value="after-2015">After 2015</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                {/* Sort by */}
                <Col md={3}>
                    <Form.Group>
                        <Form.Label><strong>Sort by</strong></Form.Label>
                        <Form.Select>
                            <option value="year-desc">Year (Newest)</option>
                            <option value="year-asc">Year (Oldest)</option>
                            <option value="title-asc">Title (A-Z)</option>
                            <option value="title-desc">Title (Z-A)</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </Card>
    );
}