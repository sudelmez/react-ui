import React from 'react';
import './home.css';
import { useLocation } from 'react-router-dom';
function HomePage() {
    const location = useLocation();
    const { user } = location.state || {};
    return (
        <div className='Home'>
            <h1>{user.name}</h1>
            <h1>{user.lastName}</h1>
        </div>

    );
}

export default HomePage;