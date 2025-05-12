import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      <div className="toast-content">
        {type === 'success' && <i className='bx bx-check-circle'></i>}
        {type === 'error' && <i className='bx bx-x-circle'></i>}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;