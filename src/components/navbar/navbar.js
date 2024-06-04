import React from "react";
import "./navbar.css";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

function NavBar() {
    return (
        <div className="bar">
            <div className="logo-divider">
                <img alt="logo" src={logo} className="logo" />
            </div>
            <div className="socialIcons">
                <div className="drawerItem">
                    <Link to={`/`}>
                        <span className="text">{("home")}</span>
                    </Link>
                    <div className="underline"></div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;