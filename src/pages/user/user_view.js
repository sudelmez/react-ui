import React from 'react';
import { useLocation } from 'react-router-dom';
import './user_view.css'
function Userpage() {
    const location = useLocation();
    const { user } = location.state || {};
    return (
        <div className='User' >
            <h1>{user.name}</h1>
            <h1>{user.lastName}</h1>
            <h1>{user.client}</h1>
            <h1>{user.createdDate}</h1>
            <h1>{user.authorizedProducts}</h1>
        </div>

    );
}

export default Userpage;