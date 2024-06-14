import React from "react";
import "./navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useAuth } from "../../hooks/auth-provider";

function NavBar() {
    const navigate = useNavigate();
    const { user, access } = useAuth();
    const auth = useAuth();
    return (
        <div className="bar">
            <div className="logo-divider">
                <img alt="logo" src={logo} className="logo" />
                <h2 onClick={() => navigate('/home')} className="drawerItem">Home</h2>
                {access.addUser && (<h2 onClick={() => { navigate('/addUser', { state: { user: {} } }) }} className="drawerItem">Add User</h2>)}
            </div>
            <div className="socialIcons">
                <h1 onClick={() => { navigate('/user', { state: { user: user } }) }} className="drawerItem" >
                    <span className="text">{user.name}</span>
                </h1>
                <h1 className="drawerItem" onClick={async () => {
                    auth.logOut();
                    navigate(`/`);
                }}  >
                    <span className="text">{("Log Out")}</span>
                </h1>
            </div>
        </div >
    );
}

export default NavBar;