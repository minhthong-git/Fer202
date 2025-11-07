import React from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

const FilterBar = ({ onFilterChange, onSortChange, filter = {}, sort = '', payments = [] }) => {
    const { search = '', semester = '', course = '' } = filter;
    const uniqueSemesters = [...new Set(payments.map(p => p.semester).filter(Boolean))];
    const uniqueCourses = [...new Set(payments.map(p => p.course).filter(Boolean))];

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">
                Bộ lọc, Tìm kiếm & Sắp xếp
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row className="g-3">
                        <Col xs={12} lg={4}>
                            <Form.Group>
                                <Form.Label>Tìm kiếm (Semester/Course)</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by semester or course name"
                                    value={search}
                                    onChange={e => onFilterChange({ ...filter, search: e.target.value })}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Semester</Form.Label>
                                <Form.Select
                                    value={semester}
                                    onChange={e => onFilterChange({ ...filter, semester: e.target.value })}
                                >
                                    <option value="">All Semesters</option>
                                    {uniqueSemesters.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Course</Form.Label>
                                <Form.Select
                                    value={course}
                                    onChange={e => onFilterChange({ ...filter, course: e.target.value })}
                                >
                                    <option value="">All Courses</option>
                                    {uniqueCourses.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={4} lg={4}>
                            <Form.Group>
                                <Form.Label>Sắp xếp theo:</Form.Label>
                                <Form.Select
                                    value={sort}
                                    onChange={e => onSortChange(e.target.value)}
                                >
                                    <option value="course_asc">Course name ascending</option>
                                    <option value="course_desc">Course name descending</option>
                                    <option value="date_asc">Date ascending</option>
                                    <option value="date_desc">Date descending</option>
                                    <option value="amount_asc">Amount ascending</option>
                                    <option value="amount_desc">Amount descending</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FilterBar;
