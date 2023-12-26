import React, { useEffect, useState } from "react";
import { app, auth, handleLogout } from "./firebase";
import { addDoc, deleteDoc, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";



function Pc() {
  const db = getFirestore(app);
  const state = useSelector((state) => state.pc);
  const [input, setInput] = useState()
  const [id, setId] = useState()
  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    pclist()
  }, [state]);
  const pclist = async () => {
    const querySnapshot = await getDocs(collection(db, "pc"));
    const list = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      const id = doc.id
      list.push({ id, ...data })
    });
    return dispatch({
      type: 'pcfatch',
      data: list
    })

  }
  const hendleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (edit && id) {
      try {
      const userfat = doc(db, "pc", id)
      await updateDoc(userfat, input);
      setId(null)
      setInput(null)
      setEdit(null)
      }catch (e){
        console.error("Error update document: ", e);
      }

    } else {
      try {
        const docRef = await addDoc(collection(db, "pc"), input);
        console.log("Document written with ID: ", docRef.id);
        setInput(null)
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "pc", id));
    } catch (e) {
      console.error("Error delete document: ", e);
    }
  }
  const handleEdit = async (id) => {
    const userfat = doc(db, "pc", id)
    const userref = await getDoc(userfat)
    const user = userref.data()
    setInput(user)
    setId(id)
    setEdit(true)

  }

  return (
    <div className="container">
      <h1 className="text-center">You are now login..</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="" class="form-label">Pc Name</label>
        <input type="text" name="pcname" class="form-control mb-3" value={input ? input.pcname : ""} onChange={hendleChange} />
        <button className="btn btn-primary">{edit ? 'Update' : 'Add'}</button>
      </form>
      <hr/>
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            {/* <th scope="col">Pc id</th> */}
            {/* <td scope="row">{item.id}</td> */}
            <th scope="col">Pc List</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {state && state.map(item => {
            return <tr>
              <td>{item.pcname}</td>
              <td><button className="btn btn-danger mx-2" onClick={() => handleDelete(item.id)}>Delete</button>
                <button className="btn btn-warning" onClick={() => handleEdit(item.id)}>Edit</button></td>
            </tr>
          }

          )}
          <tr>

          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Pc;
