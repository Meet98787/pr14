// Protected.js
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
    const { Comp } = props;
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userEvent) => {
            if (!userEvent) {
                navigate("/login");
            } else {
                setUser(userEvent);
            }
        });
        return () => unsubscribe();
    }, [auth, navigate]);

    return <>{user ? <Comp /> : null}</>;
};

export default Protected;
