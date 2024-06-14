import React from "react";
import "./navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useAuth } from "../../hooks/auth-provider";

function NavBar(handlePress) {
    const navigate = useNavigate();
    const { user, access } = useAuth();
    return (
        <div className="bar">
            <div className="logo-divider">
                <img alt="logo" src={logo} className="logo" />
                <h2 onClick={() => navigate('/home')} className="drawerItem">Home</h2>
                <h2 onClick={() => { navigate('/addUser', { state: { user: {} } }) }} className="drawerItem">Add User</h2>
                {/* {access.addUser && (<h2 onClick={() => { navigate('/addUser', { state: { user: {} } }) }} className="drawerItem">Add User</h2>)} */}
            </div>
            <div className="socialIcons">
                <div>
                    <Link className="drawerItem" to={'/profile'} >
                        <span className="text">{user.name}</span>
                    </Link>
                    <Link onClick={handlePress} className="drawerItem" to={`/`} >
                        <span className="text">{("Log Out")}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NavBar;