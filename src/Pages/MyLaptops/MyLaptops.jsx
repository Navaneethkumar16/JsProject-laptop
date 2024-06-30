import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../Components/UserContext';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';

const MyLaptops = () => {
    console.log("from mylaptops page");
    const navigate = useNavigate();
    const location = useLocation();
    const rentalData = location.state;
    const { user } = useUser();
    const userls = JSON.parse(localStorage.getItem('userls'));
    const person = {
        id: 1,
        name: 'John',
    };

    // console.log("user obj : "); console.log(user);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [commonData, setCommonData] = useState(null);
    const [totalRentCost, setTotalRentCost] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            // Fetch data from both APIs
            const [response1, response2] = await Promise.all([
                axios.get('http://localhost:8081/LaptopAPI/web/userlaptops/user/' + userls.id),
                axios.get('http://localhost:8081/LaptopAPI/web/laptops')
            ]);

            setData1(response1.data); console.log(data1);
            setData2(response2.data); console.log(data2);

            // Compare and find common objects
            const common = findCommonObjects(response1.data, response2.data);
            setCommonData(common);
            // console.log(commonData);

            const totalCost = common.reduce((acc, laptop) => acc + laptop.price, 0);
            setTotalRentCost(totalCost);

        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {


        fetchData();
    }, [userls?.id]);

    useEffect(() => {
        console.log("Updated data1: ", data1);
    }, [data1]);

    const findCommonObjects = (data2, data1) => {
        const set2 = new Set(data2.map(item => item.laptopId));
        return data1.filter(item1 => set2.has(item1.id));
    };
    const commonObjects = findCommonObjects(data2, data1);
    // console.log(commonObjects);
    // console.log(JSON.stringify(commonData)); 
    // console.log("DATA1 : "+JSON.stringify(data1));
    // console.log("DATA2 : "+JSON.stringify(data2));
    const handleCancel = async (laptop) => {
        try {
            console.log("userID : " + user.id);
            const response = await axios.get('http://localhost:8081/LaptopAPI/web/userlaptops/user/' + userls.id);
            const updatedData1 = response.data;
            console.log("cancel laptop data1 : " + JSON.stringify(updatedData1));
            console.log("cancel laptop laptopdata : " + JSON.stringify(laptop));

            const matchingUserLaptopIds = updatedData1
                .filter(data => data.laptopId === laptop.id)
                .map(data => data.userLaptopId);

            console.log(matchingUserLaptopIds);
            console.log("AFter match id ");

            const deleteRequests = matchingUserLaptopIds.map(id =>
                axios.delete(`http://localhost:8081/LaptopAPI/web/userlaptops/${id}`)
            );
            await Promise.all(deleteRequests);

            await fetchData();


            // Assume an API call to cancel the rental
            //   await axios.delete(`http://localhost:8081/LaptopAPI/web/userlaptops`+{id});

            // Update the commonData state to remove the canceled laptop
            // setCommonData(commonData.filter(item => item.id !== laptop.id));
            // console.log(commonData);
            // // Recalculate the total rent cost
            // const totalCost = commonData
            //     .filter(item => item.id !== laptop.id)
            //     .reduce((acc, laptop) => acc + laptop.price, 0);
            // setTotalRentCost(totalCost);

            alert(`Rental for ${laptop.brand} ${laptop.model} has been canceled.`);
        } catch (error) {
            console.error("Error canceling rental:", error);
            alert("Failed to cancel rental.");
        }



    };

    const handleAdd = async (laptop) => {
        navigate('/dashboard');
    };
    const handleAdd2 = () => {
        navigate('/dashboard');
    }



    const [colDefs, setColDefs] = useState([
        // { field: "id" },
        { field: "brand" },
        { field: "model" },
        { field: "processor" },
        { field: "ram" },
        { field: "storage" },
        { field: "price" },
        { field: "release_date" },
        {
            headerName: "Action",
            field: "Action",
            cellRenderer: (params) => (
                <div>
                    <button
                        className="btn btn-danger"
                        onClick={() => handleCancel(params.data)}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleAdd(params.data)}
                    >
                        Add
                    </button>
                </div>

            )
        },



    ]);


    return (

        <>


            <Container className="py-4">
                <div className="text-center">
                    <h1 className="mb-4">My Rented Laptops</h1>
                </div>
                {rentalData ? (
                    <div>
                        <Row>
                            <Col md={3}>
                                <div className="card" style={{ width: '18rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }} >
                                    <div className="card-body">
                                        <h3 className="bg-primary text-white p-1 rounded text-center" >User Details </h3>
                                        <p className="card-text"><strong>Name :</strong> {userls?.username}</p>
                                        <p className="card-text"><strong>Email :</strong> {userls?.email}</p>
                                    </div>
                                </div>
                            </Col>
                            {/* <Col md={6}>
                                <h3>Laptop Details:</h3>
                                <p><strong>Brand:</strong> {rentalData?.laptop.brand}</p>
                                <p><strong>Model:</strong> {rentalData?.laptop.model}</p>
                            </Col> */}
                            <Col md={3}>
                                <div className="card" style={{ width: '18rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                    <div className="card-body">
                                        <h3 className="bg-primary text-white p-1 rounded text-center">Rental Details </h3>
                                        <p className="card-text"><strong>Street Address:</strong> {rentalData?.streetAddress}</p>
                                        <p className="card-text"><strong>Village:</strong> {rentalData?.village}</p>
                                        <p className="card-text"><strong>Mandal:</strong> {rentalData?.mandal}</p>
                                        <p className="card-text"><strong>District:</strong> {rentalData?.district}</p>
                                        <p className="card-text"><strong>Pincode:</strong> {rentalData?.pincode}</p>
                                        <p className="card-text"><strong>State:</strong> {rentalData?.state}</p>
                                        <p className="card-text"><strong>Rental Duration:</strong> {rentalData?.rentalDuration} days</p>
                                        <p className="card-text"><strong>Rent Cost:</strong>  ${totalRentCost}</p>
                                        <p className="card-text"><strong>Delivery Option:</strong> {rentalData?.deliveryOption}</p>
                                    </div>
                                </div>

                            </Col>

                            <Col md={6}>
                                {/* <Container> */}

                                <div
                                    className="ag-theme-quartz" onContextMenu={e => e.preventDefault()}
                                    style={{ height: 400 }}
                                >   <h3 className="bg-primary text-white p-1 rounded text-center" >Rented Laptops </h3>
                                    <AgGridReact
                                        rowData={commonData}
                                        columnDefs={colDefs}


                                    />
                                </div>
                                {/* </Container> */}



                            </Col>
                            <Col md={6}>
                                <h5 >Include laptops to rent</h5>
                                <button className="btn btn-primary"
                                    onClick={() => handleAdd2()}>Add</button>

                            </Col>
                        </Row>
                    </div>
                ) : (
                    <p className="text-center">No rental data available.</p>
                )}
            </Container>

            {/* <div>
                <h1>Common Data from Both APIs</h1>
                <pre>{JSON.stringify(commonData, null, 2)}</pre>
            </div> */}





        </>
    );
};

export default MyLaptops;
