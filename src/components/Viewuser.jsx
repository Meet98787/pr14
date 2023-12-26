import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Viewuser() {
    const state = useSelector((state) => state.users);
    const id = useParams();
    const userid = id.id;
    const user = state.find((item) => item.id === userid);
  return (
    <div className='container'>
      <h1 className='text-center'>User Details</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Add other details you want to display */}
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  )
}

export default Viewuser