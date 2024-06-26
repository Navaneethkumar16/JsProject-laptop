import axios from 'axios';
import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const RentalModal = ({ show, onHide, laptop, onSubmit }) => {
    const [formData, setFormData] = React.useState({
        streetAddress: '',
        village: '',
        mandal: '',
        district: '',
        pincode: '',
        state: '',
        rentalDuration: '',
        rentCost: laptop?.price || '',
        deliveryOption: 'normal', // Default to normal delivery
    });

    useEffect(() => {
        // Update rentCost when laptop changes
        if (laptop) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                rentCost: laptop.price || ''
            }));
        }
    }, [laptop]);

    /* const [errors, setErrors] = React.useState({}); */

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDeliveryChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, deliveryOption: value });
    };

    const { user } = useUser();
    // console.log(user?.id);
    const handleSubmit = async () => {
        try {
            const additionalCharges = formData.deliveryOption === 'quick' ? 50 : 0;
            const totalCost = parseFloat(formData.rentCost) + additionalCharges;
            const rentalData = { ...formData, totalCost, laptop };
            // console.log("formData :"+formData);
            // console.log(formData);
            // console.log("rentalData :"+rentalData);
            // console.log(rentalData.laptop.id);
            const lapID = rentalData?.laptop?.id;

            const user_id = user?.id; // Assuming user is structured as { id, ... }
            if (!user_id) {
                console.error('User ID is not defined');
                return;
            }


            const userlaptopdata = {
                laptopId: lapID,
                userId: user_id
            }
            const headers = {
                'Content-Type': 'application/json',
                
            };
            
            console.log(userlaptopdata);

            // Send the data to the API
            const response = await axios.post('http://localhost:8081/LaptopAPI/web/userlaptops', userlaptopdata, {headers});

            // Handle response from the API
            if (response.status === 201) {
                onSubmit(rentalData);
                onHide();
                navigate('/mylaptops', { state: rentalData });
            } else {
                console.error('Failed to submit data:', response.status);
                // Handle error accordingly
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            // Handle error accordingly
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Rent Laptop</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="streetAddress">
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="streetAddress"
                            value={formData.streetAddress}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="village">
                        <Form.Label>Village</Form.Label>
                        <Form.Control
                            type="text"
                            name="village"
                            value={formData.village}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="mandal">
                        <Form.Label>Mandal</Form.Label>
                        <Form.Control
                            type="text"
                            name="mandal"
                            value={formData.mandal}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="district">
                        <Form.Label>District</Form.Label>
                        <Form.Control
                            type="text"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="pincode">
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="rentalDuration">
                        <Form.Label>Rental Duration (days)</Form.Label>
                        <Form.Control
                            type="number"
                            name="rentalDuration"
                            value={formData.rentalDuration}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="rentCost">
                        <Form.Label>Rent Cost</Form.Label>
                        <Form.Control
                            type="number"
                            name="rentCost"
                            value={formData.rentCost}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="deliveryOption">
                        <Form.Label>Delivery Option</Form.Label>
                        <Form.Check
                            type="radio"
                            name="deliveryOption"
                            value="normal"
                            label="Normal Delivery"
                            checked={formData.deliveryOption === 'normal'}
                            onChange={handleDeliveryChange}
                        />
                        <Form.Check
                            type="radio"
                            name="deliveryOption"
                            value="quick"
                            label="Quick Delivery (Additional Charges)"
                            checked={formData.deliveryOption === 'quick'}
                            onChange={handleDeliveryChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RentalModal;