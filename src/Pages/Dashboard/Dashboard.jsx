import Styles from './Dashboard.module.css'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from 'bootstrap';
import ButtonRenderer from '../ButtonRenderer/ButtonRenderer';
import LaptopModal from '../../Components/LaptopModal';
import RentalModal from '../../Components/RentalModal';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [laptops, setLaptops] = useState([]);
    //for model popup
    const [modalShow, setModalShow] = useState(false);
    const [selectedLaptop, setSelectedLaptop] = useState(null);
    //for model popup
    //for Rent
    const [rentalModalShow, setRentalModalShow] = useState(false);
    const [rentalData, setRentalData] = useState(null);
    //for Rent
   
    useEffect(() => {
        axios.get("http://localhost:8081/LaptopAPI/web/laptops").then(Response => {
            setLaptops(Response.data);
            // console.log(Response.data)
        }).catch(error => {
            console.error("There was an error fetching the laptops!", error);
        });
    }, []);

    //for model popup
    const handleView = (laptop) => {
        setSelectedLaptop(laptop);
        setModalShow(true);
    };
    //for model popup
    //for Rent
    const handleRent = (laptop) => {
        setSelectedLaptop(laptop);
        setRentalModalShow(true);
    };

    const handleRentalSubmit = (data) => {
        // Handle the rental data submission here
        setRentalData(data);
        // console.log("Rental Data:", data);
        setRentalModalShow(false);
    };
    //for Rent

    /* const [cellData, setCellData] = useState({})
     const handleView1 = (data) => {
 
         console.log(data);
         // setCellData(data);
     }
     */

    const CustomButtonComponent = (props) => {
        return <div>
            <button onClick={() => { handleView(props.data) }} type="button" className="btn btn-outline-primary btn-sm" >View</button>
            <button onClick={() => { handleRent(props.data) }} type="button" className="btn btn-outline-primary btn-sm" >To Rent </button>
        </div>

    };

    const [rowData, setRowData] = useState([

    ]);
    const [colDefs, setColDefs] = useState([
        { field: "id" },
        { field: "brand" },
        { field: "model" },
        { field: "processor" },
        { field: "ram" },
        { field: "storage" },
        { field: "price" },
        { field: "release_date" },
        { field: "Action", cellRenderer: CustomButtonComponent, lockPosition: 'right', lockVisible: true },
        /*  {
              headerName: "Actions",
              cellRenderer: 'buttonRenderer',
              pinned: 'left',
              width: 150,
              suppressSizeToFit: true,
          },  */
    ]);
    //id,brand, model, processor, ram, storage, price, release_date



    return (
        <>

            <div className={Styles.container}>
                <h1>Dashboard</h1>
                <div
                    className="ag-theme-quartz" onContextMenu={e => e.preventDefault()}
                    style={{ height: 500 }}
                >
                    <AgGridReact
                        rowData={laptops}
                        columnDefs={colDefs}
                    /* frameworkComponents={{ buttonRenderer: ButtonRenderer }}  */

                    />
                </div>
            </div>

           

            <LaptopModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                laptop={selectedLaptop}
            />

            <RentalModal
                show={rentalModalShow}
                onHide={() => setRentalModalShow(false)}
                laptop={selectedLaptop}
                onSubmit={handleRentalSubmit}
            />


        </>
    )
}
export default Dashboard;