import wall from '../../assets/wall.jpg';
import React, { useState } from 'react';
import './auth.css';
import CustomTextInput from '../../components/text_input/text_input';
import CustomButton from '../../components/button/custom-button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth-provider';

function AuthPage() {
    const auth = useAuth();
    const [mail, setmail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [visible, setVisible] = useState(true);
    const handlePress = async () => {
        try {
            var res = await auth.loginAction({ "email": mail, "password": password });
            if (res !== null) {
                setError(false);
                navigate('/home');
            }
        } catch (err) {
            console.log(err);
        }
    }
    const seePassword = () => {
        setVisible(!visible);
    }
    return (
        <div className='Auth'>
            <div className="Auth-left">
                <img className='image' alt='' src={wall} /> </div>
            <div className='Auth-right'>
                <h1>Welcome!</h1>
                <CustomTextInput hint={'Email'} setInputValue={setmail} input={mail}></CustomTextInput>
                <div className='rowitems'>
                    <CustomTextInput isVisible={visible} hint={'Password'} setInputValue={setpassword} input={password}></CustomTextInput>
                    <button className='toggle-password' onClick={seePassword}>
                        {visible ? 'Show' : 'Hide'}
                    </button>                </div>
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