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
        <table>
          <tr>
            <td><h2>Name : </h2></td>
            <td><h4>{user.name}</h4></td>
          </tr>
          <tr>
            <td><h2>Email :</h2></td>
            <td><h4>{user.email}</h4></td>
          </tr>
          <tr>
            <td><h2>Assigned Pc : </h2></td>
            <td><h4> {user.assignedPc}</h4></td>
          </tr>
          <tr>
            <td><h2>Remark :</h2></td>
            <td><h4>{user.remarks}</h4></td>
          </tr>
        </table>
      ) : (
        <p>User not found</p>
      )}
    </div>
  )
}

export default Viewuser