import React from 'react';
import '../assets/css/Footer.css';

const Footer = () => {
  return (
    <footer>
      <p>Lebonson <i className="far fa-copyright"></i> {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer
