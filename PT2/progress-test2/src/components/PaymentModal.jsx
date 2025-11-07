import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PaymentModal = ({ show, handleClose, onSave, payment }) => {
    const [formData, setFormData] = useState({ semester: '', course: '', date: '', amount: '' });

    useEffect(() => {
        if (payment) setFormData(payment);
        else setFormData({ semester: '', course: '', date: '', amount: '' });
    }, [payment]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!formData.semester || !formData.course || !formData.date || !formData.amount) {
            alert('Please fill in all fields.');
            return;
        }
        onSave(formData);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{payment ? 'Edit Payment' : 'Add Payment'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Semester</Form.Label>
                        <Form.Control name="semester" value={formData.semester} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Course</Form.Label>
                        <Form.Control name="course" value={formData.course} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" name="amount" value={formData.amount} onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit}>{payment ? 'Update' : 'Add'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentModal;
