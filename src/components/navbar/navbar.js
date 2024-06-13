import React from "react";
import "./navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

function NavBar(userName) {
    const navigate = useNavigate();
    return (
        <div className="bar">
            <div className="logo-divider">
                <img alt="logo" src={logo} className="logo" />
                <h2 onClick={() => navigate('/home')} className="drawerItem">Home</h2>
                <h2 onClick={() => { }} className="drawerItem">Roles</h2>
                <h2 onClick={() => { navigate('/addUser') }} className="drawerItem">Add User</h2>
            </div>
            <div className="socialIcons">
                <div>
                    <Link className="drawerItem" to={`/`} >
                        <span className="text">{userName.name}</span>
                    </Link>
                    <Link className="drawerItem" to={`/`} >
                        <span className="text">{("Log Out")}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NavBar;