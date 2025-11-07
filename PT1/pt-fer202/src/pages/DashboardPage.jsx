import React, { useState } from 'react';
import { Container, Card, Spinner, Alert, Button } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentModal from '../components/PaymentModal';
import { usePaymentContext } from '../contexts/PaymentContext';

const DashboardPage = () => {
    const { 
        filteredPayments, 
        loading, 
        error, 
        addPayment, 
        updatePayment, 
        deletePayment,
        setFilter,
        setSort,
        filter,
        sort,
        payments 
    } = usePaymentContext();

    const [showModal, setShowModal] = useState(false);
    const [editingPayment, setEditingPayment] = useState(null);

    const handleAdd = () => {
        setEditingPayment(null);
        setShowModal(true);
    };

    const handleEdit = (payment) => {
        setEditingPayment(payment);
        setShowModal(true);
    };

    const handleSave = async (payment) => {
        if (editingPayment) {
            await updatePayment(payment);
        } else {
            await addPayment(payment); 
        }
        setShowModal(false);
    };

    return (
        <>
            <NavigationHeader />

            <Container>
                <FilterBar
                    onFilterChange={setFilter}
                    onSortChange={setSort}
                    filter={filter}
                    sort={sort}
                    payments={payments} 
                />

                <Card className="mb-4 shadow-sm">
                    <Card.Header as="h5">Dashboard Overview</Card.Header>
                    <Card.Body>

                        <div className="mb-3">
                            <Button
                                variant="success"
                                onClick={handleAdd}
                                disabled={loading}
                            >
                                Add Payment
                            </Button>
                        </div>

                        {loading && <Spinner animation="border" />}
                        {error && <Alert variant="danger">{error}</Alert>}

                        {!loading && !error && filteredPayments.length === 0 && (
                            <p>No payments found.</p>
                        )}

                        {!loading && !error && filteredPayments.length > 0 && (
                            <table className="table table-striped table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Semester</th>
                                        <th>Course</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPayments.map((p) => (
                                        <tr key={p.id}>
                                            <td>{p.semester}</td>
                                            <td>{p.course}</td>
                                            <td>{p.date}</td>
                                            <td>{p.amount}</td>
                                            <td>
                                                <Button 
                                                    variant="warning" 
                                                    size="sm" 
                                                    className="me-2" 
                                                    onClick={() => handleEdit(p)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button 
                                                    variant="danger" 
                                                    size="sm" 
                                                    onClick={() => deletePayment(p.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </Card.Body>
                </Card>

                <PaymentModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    onSave={handleSave}
                    payment={editingPayment}
                />
            </Container>
        </>
    );
};

export default DashboardPage;
