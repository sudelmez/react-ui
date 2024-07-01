import React from 'react';
import './select_policy.css';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar';
import CustomButton from '../../components/button/custom-button';

function SelectPolicy() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId, userInfo } = location.state || {};

    const handleBoxClick = (product, no) => {
        navigate('/addPolicy', { state: { userInfo: userInfo, product: product, no: no, userId: userId, noList: null } });
    }

    return (
        <div className="container">
            <NavBar></NavBar>
            <div className="box-container">
                <div className="box" onClick={() => handleBoxClick("Kasko", "101")}>
                    Kasko
                </div>
                <div className="box" onClick={() => handleBoxClick("Sağlık", "102")}>
                    Sağlık
                </div>
                <div className="box" onClick={() => handleBoxClick("Hayat", "103")}>
                    Hayat
                </div>
            </div>
            <div className="buttonBack">
                <CustomButton title={"go back"} handlePress={() => { navigate('/home', { state: { userId: userId } }) }}></CustomButton>
            </div>
        </div>
    );
}

export default SelectPolicy;
