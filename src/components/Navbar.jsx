// Navbar.jsx
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app, auth } from './firebase';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

function Navbar() {
  const db = getFirestore(app);
  const [usersize, setUsersize] = useState(null);
  const [pcsize, setPcsize] = useState(null);
  const [assignpcsize, setAssignpcsize] = useState(null);
  const userdispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        onlord();
      } else {
        setUser(null);
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const onlord = async () => {
    userlist();
    pclist();
    assignlist();
    const userref = await getDocs(collection(db, "users"));
    setUsersize(userref.size);
    const pcref = await getDocs(collection(db, "pc"));
    setPcsize(pcref.size);
    const assignpcref = await getDocs(collection(db, "assign"));
    setAssignpcsize(assignpcref.size);
  };

  const userlist = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const userlist = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      userlist.push({ id, ...data });
    });
    userdispatch({
      type: 'fetch',
      data: userlist,
    });
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  const pclist = async () => {
    const querySnapshotpc = await getDocs(collection(db, "pc"));
    const pclist = [];
    querySnapshotpc.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      pclist.push({ id, ...data });
    });
    userdispatch({
      type: 'pcfatch',
      data: pclist,
    });
  };

  const assignlist = async () => {
    const querySnapshotpc = await getDocs(collection(db, "assign"));
    const pclist = [];
    querySnapshotpc.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      pclist.push({ id, ...data });
    });
    userdispatch({
      type: 'assignfatch',
      data: pclist,
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link to={"/"} className="nav-link">
                      Dashbord
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/user"} className="nav-link">
                      User
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/pc"} className="nav-link">
                      Pc
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/assign"} className="nav-link">
                      Assign
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-primary" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to={"/"} className="nav-link">
                      Dashbord
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
            </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
