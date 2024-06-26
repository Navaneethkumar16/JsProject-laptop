
import React from 'react';
import Styles from './ButtonRenderer.module.css';

const ButtonRenderer = (props) => {
  const onViewClick = () => {
    // handle view action here
    console.log("View button clicked for", props.data);
  };

  const onDeleteClick = () => {
    // handle delete action here
    console.log("Delete button clicked for", props.data);
  };

  return (
    <div className={Styles.buttonContainer}>
      <button onClick={onViewClick} className={Styles.viewButton}>View</button>
      <button onClick={onDeleteClick} className={Styles.deleteButton}>Delete</button>
    </div>
  );
};

export default ButtonRenderer;
