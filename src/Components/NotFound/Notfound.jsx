import React from 'react';
import { Link } from 'react-router-dom';

export default function Notfound() {
  return (
    <div className="container">
      <h2 className='py-2'>Not Found</h2>
      <p>This page doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Go to Homepage</Link>
    </div>
  );
}