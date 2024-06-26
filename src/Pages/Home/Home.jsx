import  Styles from './Home.module.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import dayjs from 'dayjs';
import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames';

function Home() {
  const [myLaptop, setmyLaptop] = useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (order) => {
    setShow(true);
    console.log(order)
  }

  useEffect(() => {
    axios.get("http://localhost:8081/LaptopAPI/web/laptops").then(Response => {

      console.log(Response.data)
      setmyLaptop(Response.data)

    })
    //https://api.restful-api.dev/objects
    //https://jsonplaceholder.typicode.com/todos/1
    // axios.get("http://localhost:8081/LaptopAPI/web/laptops/").then(Response =>{
    //   console.log(Response)
    // })

  }, [])
  return (
    <>

      <div className="container">
     {/* <img src="..." className="img-fluid" alt="Welcome"/> */}
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Id</th>
              <th>user Id</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Processor</th>
              <th>RAM</th>
              <th>Release</th>
              <th>Storage</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              myLaptop.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>{order?.id}</td>
                    <td>{order?.user_id}</td>
                    <td>{order?.brand}</td>
                    <td>{order?.model}</td>
                    <td>{order?.processor}</td>
                    <td>{order?.ram}</td>
                    <td>{dayjs(order?.release_date).format("DD/MM/YYYY") || order?.release_date}</td>
                    <td>{order?.storage}</td>
                    <td>${order?.price.toFixed(2)}</td>
                    <td><Button variant="primary" onClick={() => handleShow(order)} size='sm'>Info</Button>{' '}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}

export default Home