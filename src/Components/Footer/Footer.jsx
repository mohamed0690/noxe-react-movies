import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer fixed-bottom text-center py-2'>
      <h3 className='text-white footer-text'>
        © Mohamed Mahrous {currentYear} All Rights Reserved
      </h3>
    </footer>
  );
}