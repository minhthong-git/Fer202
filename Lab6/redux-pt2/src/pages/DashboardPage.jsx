import React, { useState, useEffect, useMemo } from 'react';
import { Container, Card, Spinner, Alert, Button, Table, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentModal from '../components/PaymentModal';
import ConfirmModal from '../components/ConfirmModal';
import { fetchPayments, createPayment, updatePayment, deletePayment } from '../features/payments/paymentsSlice';

const DashboardPage = () => {
    const dispatch = useDispatch();
    const { list: payments, loading, error } = useSelector((state) => state.payments);

    const [filter, setFilter] = useState({ search: '', semester: '', course: '' });
    const [sort, setSort] = useState('date_desc');
    
    const [showModal, setShowModal] = useState(false);
    const [editingPayment, setEditingPayment] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        dispatch(fetchPayments());
    }, [dispatch]);

    const filteredPayments = useMemo(() => {
        if (!payments) return [];
        let result = [...payments];

        // Filter logic
        if (filter.search) {
            const s = filter.search.toLowerCase();
            result = result.filter(p => 
                (p.semester && p.semester.toLowerCase().includes(s)) || 
                (p.course && p.course.toLowerCase().includes(s))
            );
        }
        if (filter.semester) result = result.filter(p => p.semester === filter.semester);
        if (filter.course) result = result.filter(p => p.course === filter.course);
        
        // Sort logic
        if (sort === 'amount_desc') result.sort((a, b) => Number(b.amount) - Number(a.amount));
        else if (sort === 'amount_asc') result.sort((a, b) => Number(a.amount) - Number(a.amount));
        // (Thêm các case sort khác nếu cần)

        return result;
    }, [payments, filter, sort]);

    const handleSave = (formData) => {
        if (editingPayment) dispatch(updatePayment({ ...formData, id: editingPayment.id }));
        else dispatch(createPayment({ ...formData, id: String(Date.now()) }));
        setShowModal(false);
    };

    const handleDelete = () => {
        if (deleteId) {
            dispatch(deletePayment(deleteId));
            setShowConfirm(false);
        }
    };

    return (
        <>
            <NavigationHeader />
            <Container className="mt-4">
                <FilterBar 
                    onFilterChange={setFilter} 
                    onSortChange={setSort} 
                    filter={filter} 
                    sort={sort} 
                    payments={payments} 
                />
                
                <Card className="shadow-sm">
                    <Card.Header className="d-flex justify-content-between">
                        <h5>Dashboard Overview</h5>
                        <Button 
                            variant="success" 
                            onClick={() => { setEditingPayment(null); setShowModal(true); }}
                        >
                            + Add Payment
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        {loading && <Spinner animation="border" />}
                        {error && <Alert variant="danger">{error}</Alert>}
                        
                        {!loading && !error && (
                            <Table striped hover>
                                <thead className="table-dark">
                                    <tr>
                                        <th>Semester</th>
                                        <th>Course</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPayments.map(p => (
                                        <tr key={p.id}>
                                            <td>{p.semester}</td>
                                            <td>{p.course}</td>
                                            <td>{p.date}</td>
                                            <td>{Number(p.amount).toLocaleString()}</td>
                                            <td>
                                                <Badge bg={p.status === 'FAILED' ? 'danger' : 'success'}>
                                                    {p.status || 'SUCCESS'}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Button 
                                                    size="sm" 
                                                    variant="warning" 
                                                    className="me-2" 
                                                    onClick={() => { setEditingPayment(p); setShowModal(true); }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    variant="danger" 
                                                    onClick={() => { setDeleteId(p.id); setShowConfirm(true); }}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Card.Body>
                </Card>

                <PaymentModal 
                    show={showModal} 
                    handleClose={() => setShowModal(false)} 
                    onSave={handleSave} 
                    payment={editingPayment} 
                />
                <ConfirmModal 
                    show={showConfirm} 
                    title="Delete?" 
                    message="Are you sure?" 
                    onConfirm={handleDelete} 
                    handleClose={() => setShowConfirm(false)} 
                />
            </Container>
        </>
    );
};

export default DashboardPage;
