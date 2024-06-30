import React from 'react'
import Styles from './Profile.module.css'
import { useUser } from '../../Components/UserContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Profile() {

  const { user } = useUser();
  const userls = JSON.parse(localStorage.getItem('userls'));
  console.log(userls);
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem('userls');
    navigate('/login');
  }

  return (
    <>
      <div className={Styles.container}>
        <div >
          <h1 className="display-1 " >
            PROFILE
            <small className="text-body-secondary" >  Information</small>
          </h1>
          <p className="lead "><strong>Name </strong> {userls?.username} </p>
          <p className="lead"><strong>Email</strong> {userls?.email} </p>
        </div>
        <button className="btn btn-danger" onClick={handlelogout}>Log out  </button>
        
      </div>
      <div className={Styles.container}><img src="src\MyImages\Working Computer GIF - Working Work Computer - Discover & Share GIFs.gif" alt="img" /></div>

    </>

  )
}

export default Profile;
