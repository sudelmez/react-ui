import wall from '../../assets/wall.jpg';
import React, { useState } from 'react';
import './auth.css';
import CustomTextInput from '../../components/text-input/text-input';
import CustomButton from '../../components/button/custom-button';
import NavBar from '../../components/navbar/navbar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth-provider';

function AuthPage() {
    const auth = useAuth();
    const [mail, setmail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const handlePress = async () => {
        try {
            const user = await auth.loginAction({ "email": mail, "password": password });
            if (user) {
                setError(false);
                navigate('/home');
            }
            else { setError(true); }

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='Auth'>
            <div className="navbar-app"><NavBar></NavBar></div>
            <div className="Auth-left">
                <img className='image' alt='' src={wall} />
            </div>
            <div className='Auth-right'>
                <h1>Welcome!</h1>
                <CustomTextInput hint={'Email'} setInputValue={setmail} input={mail}></CustomTextInput>
                <CustomTextInput hint={'Password'} setInputValue={setpassword} input={password}></CustomTextInput>
                <CustomButton title={'Login'} handlePress={handlePress}></CustomButton>
                {error ? (<>
                    <h2>Wrong User!</h2>
                </>) : (
                    <h1> </h1>
                )}
            </div>
        </div>

    );
}

export default AuthPage;