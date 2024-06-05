import React, { useEffect, useState } from 'react';
import './home.css';
import { useAuth } from '../../hooks/auth-provider';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const { user, setUser } = auth;
    useEffect(() => {
        setLoad(false);
    }, []);
    const handlePress = async () => {
        setLoad(true);
        await auth.logOut();
        navigate('/auth');
    }
    return (
        <div className='Home'>
            {!load ? (<>
                <h1>{user.name}</h1>
                <h1>{user.lastName}</h1>
                <h1>{user.token}</h1>
                <button onClick={handlePress}>Log Out</button>
            </>) : (
                <h1>Loading...</h1>
            )}
        </div>

    );
}

export default HomePage;