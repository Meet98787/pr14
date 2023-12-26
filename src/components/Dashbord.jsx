import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { app } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Dashbord() {
    const db = getFirestore(app);
    const [usersize, setUsersize] = useState()
    const [pcsize, setPcsize] = useState()
    const [assignpcsize, setAssignpcsize] = useState()
    const userdispatch = useDispatch();
    useEffect(() => {
        onlord()
    }, []);

    const onlord = async () => {
        const userref = await getDocs(collection(db, "users"));
        setUsersize(userref.size)
        const pcref = await getDocs(collection(db, "pc"));
        setPcsize(pcref.size)
        const assignpcref = await getDocs(collection(db, "assign"));
        setAssignpcsize(assignpcref.size)
    }
    return (
        <div>
            <h1 className='h1'> Dashbord </h1>
            <div className="container">
                <div className="row">
                <div className="col-4 shadow p-3 mb-5 bg-white rounded text-center">
                    <h1 className="text-center"> {usersize}</h1>
                    <Link to={"/user"} class="text-center " >View User</Link>
                    <h4>Total User</h4>
                </div>
                <div className="col-4 shadow p-3 mb-5 bg-white rounded text-center">
                <h1 className="text-center"> {pcsize}</h1>
                <Link to={"/pc"} class="text-center " >View Pc</Link>
                    <h4>Total pc</h4>
                     
                </div>
                <div className="col-4 shadow p-3 mb-5 bg-white rounded text-center">
                <h1 className="text-center"> {assignpcsize}</h1>
                <Link to={"/assign"}>View Assign Pc</Link>
                    <h4>Assign pc</h4>
                    
                </div>
                </div>
            </div>
        </div>
    )
}

export default Dashbord