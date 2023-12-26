import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { app } from './firebase';

function Assign() {
  const state = useSelector((state) => state);
  const assign = state.assign
  const [id, setId] = useState()
  const [userid, setUserId] = useState()
  const [edit, setEdit] = useState(false)
  const users = state.users
  const pc = state.pc
  const pcdispatch = useDispatch();
  const db = getFirestore(app);
  const [input, setInput] = useState()
  const hendleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    assignlist()
  }, [assign]);
  const assignlist = async () => {
    const querySnapshotpc = await getDocs(collection(db, "assign"));
    const pclist = []
    querySnapshotpc.forEach((doc) => {
      const data = doc.data()
      const id = doc.id
      pclist.push({ id, ...data })
    });
    return pcdispatch({
      type: 'assignfatch',
      data: pclist
    })

  }

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (edit && id) {
      try {
        const isPcAssigned = assign.some((item) => item.pc === input.pc);
        if (isPcAssigned) {
          alert("PC already assigned");
        } else {
          const userRef = doc(db, "assign", id);
          await updateDoc(userRef, input);
          const userQuerySnapshot = await getDocs(collection(db, "users"));
          userQuerySnapshot.forEach(async (userDoc) => {
            const userData = userDoc.data();
            if (userData.name === input.username) {
              const userDocRef = doc(db, "users", userDoc.id);
              await updateDoc(userDocRef, {
                assignedPc: input.pc,
                remarks: input.Remark,
              });
            }
          });
          setId(null);
          setInput(null);
          setEdit(null);
        }

      } catch (e) {
        console.error("Error updating document: ", e);
      }
    } else {
      const isUserAssigned = assign.some((item) => item.username === input.username);
      const isPcAssigned = assign.some((item) => item.pc === input.pc);

      if (isUserAssigned) {
        alert("User already assigned");
      } else if (isPcAssigned) {
        alert("PC already assigned");
      } else {
        try {
          const docRef = await addDoc(collection(db, "assign"), input);
          setId(docRef.id);
          const userQuerySnapshot = await getDocs(collection(db, "users"));
          userQuerySnapshot.forEach(async (userDoc) => {
            const userData = userDoc.data();
            console.log(input)
            if (userData.name === input.username) {
              const userDocRef = doc(db, "users", userDoc.id);
              await updateDoc(userDocRef, {
                assignedPc: input.pc,
                remarks: input.Remark,
              });
            }
          });

          setInput(null);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const assignDoc = doc(db, "assign", id);
      const assignSnapshot = await getDoc(assignDoc);
      const assignData = assignSnapshot.data();
      await deleteDoc(assignDoc);
      const userQuerySnapshot = await getDocs(collection(db, "users"));
      userQuerySnapshot.forEach(async (userDoc) => {
        const userData = userDoc.data();
        if (userData.name === assignData.username) {
          const userDocRef = doc(db, "users", userDoc.id);
          await updateDoc(userDocRef, {
            assignedPc: null, 
            remarks: null,  
          });
        }
      });
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };
  

  const handleEdit = async (id) => {
    const userfat = doc(db, "assign", id)
    const userref = await getDoc(userfat)
    const user = userref.data()
    setInput(user)
    setId(id)
    setEdit(true)

  }
  return (
    <div className='container'>
      <h1 className="text-center">Assign Pc</h1>
      <form onSubmit={handlesubmit} className='col-4'>
        <select id="dropdown" name="pc" class="form-select mb-3" onChange={hendleChange}>
          <option value={input ? input.pc : ""}>{input ? input.pc : "Select Pc"}</option>
          {pc && pc.map(item => {
            return <option name="pc" value={item.pcname}>{item.pcname}</option>
          }

          )}

        </select>
        <select id="dropdown" name="username" class="form-select mb-3" onChange={hendleChange}>
          <option value={input ? input.username : ""}>{input ? input.username : "Select User"}</option>
          {users && users.map(item => {
            return <option name="username" value={item.name}>{item.name}</option>
          }
          )}
        </select>
        <label class="form-label">Remark</label>
        <input type="text" name="Remark" class="form-control mb-3" placeholder='Add Remark For User' value={input ? input.Remark : ""} onChange={hendleChange} required />

        <button className='btn btn-primary mb-3'>{edit ? 'Update' : 'Add'}</button>
      </form>
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            {/* <th scope="col">id</th> */}
            <th scope="col">User name</th>
            <th scope="col">Assigned pc</th>
            <th scope="col">Remarks</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* <td scope="row">{item.id}</td> */}
          {assign && assign.map(item => {
            return <tr>
              <td>{item.username}</td>
              <td>{item.pc}</td>
              <td>{item.Remark}</td>
              <td>
                <button className="btn btn-danger mx-2" onClick={() => handleDelete(item.id)}>Delete</button>
                <button className="btn btn-warning mx-2" onClick={() => handleEdit(item.id)}>Edit</button>
              </td>
            </tr>
          }

          )}
          <tr>

          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Assign