import React, { useEffect, useState } from "react";
import { app, auth, handleLogout } from "./firebase";
import { addDoc, deleteDoc, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


function User() {
  const db = getFirestore(app);
  const state = useSelector((state) => state.users);
  // const [userslist,setUserslist]=useState(state)
  const [input, setInput] = useState()
  const [search, setSearch] = useState()
  const [id, setId] = useState()
  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    userlist()
  }, [state]);
  const userlist = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const list = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        list.push({ id, ...data });
      });
  
      dispatch({
        type: 'fetch',
        data: list
      });
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };
  
  
  const hendleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (edit && id) {
      try {
      const userfat = doc(db, "users", id)
      await updateDoc(userfat, input);

      setId(null)
      setInput(null)
      setEdit(null)

      }catch (e){
        console.error("Error update document: ", e);
      }

    } else {
      try {
        const docRef = await addDoc(collection(db, "users"), input);
        console.log("Document written with ID: ", docRef.id);
        setInput(null)
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
    } catch (e) {
      console.error("Error delete document: ", e);
    }
  }
  const handleEdit = async (id) => {
    const userfat = doc(db, "users", id)
    const userref = await getDoc(userfat)
    const user = userref.data()
    setInput(user)
    setId(id)
    setEdit(true)

  }

  const handleSearch = (e) => {
    const name = e.target.value
    const NewList = state.filter((item) => item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
    setSearch(NewList)
  }

  return (
    <div className="container">
      <h1 className="text-center">All Users</h1>
      <form onSubmit={handleSubmit}>
        <label class="form-label">Name</label>
        <input type="text" name="name" class="form-control" value={input ? input.name : ""} onChange={hendleChange} />
        <label class="form-label">Email</label>
        <input type="text" name="email" class="form-control mb-3 " value={input ? input.email : ""} onChange={hendleChange} />
        <button className="btn btn-primary">{edit ? 'Update' : 'Add'}</button>
      </form>
      <hr />
      <input type="text" id="" placeholder='Search by Name...'  onChange={handleSearch} />
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            {/* <th scope="col">id</th> */}
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">AssignedPc</th>
            <th scope="col">Remarks</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {/* <td scope="row">{item.id}</td> */}
        {search ? search && search.map(item => {
            return <tr>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.assignedPc}</td>
              <td>{item.remarks}</td>
              <td><button className="btn btn-danger mx-2" onClick={() => handleDelete(item.id)}>Delete</button>
                <button className="btn btn-warning" onClick={() => handleEdit(item.id)}>Edit</button>
                <Link className="btn btn-warning" to={`/user/view/${item.id}`}>View</Link></td>
            </tr>
          }
          ):state && state.map(item => {
            return <tr>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.assignedPc}</td>
              <td>{item.remarks}</td>
              <td><button className="btn btn-danger mx-2" onClick={() => handleDelete(item.id)}>Delete</button>
                <button className="btn btn-warning" onClick={() => handleEdit(item.id)}>Edit</button>
                <Link className="btn btn-warning" to={`/user/view/${item.id}`}>View</Link></td>
            </tr>
          }
          )
        }
          <tr>

          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default User;
