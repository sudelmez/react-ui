import React, { useState } from 'react';
import './add_user.css'
import CustomTextInput from '../../components/text_input/text_input';
import CustomButton from '../../components/button/custom-button';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar';
function AddUserPage() {
    const [name, setname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [client, setclient] = useState('');
    const [role, setrole] = useState('');
    const navigate = useNavigate();
    const handleSave = async () => {
        var data = {
            "id": {},
            "uId": "1",
            "email": email,
            "name": name,
            "password": password,
            "lastName": lastname,
            "token": "12345",
            "client": client,
            "authorizedProducts": [role],
            "createdDate": Date.now
        };
        try {
            const response = await fetch('http://localhost:5273/UserList/add', {
                method: 'POST', headers: {
                    "accept": "*/*",
                    "Content-Type": "application/json"
                }, body: JSON.stringify(data)
            });
            if (response.status === 200) {
                navigate('/home');
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='AddUser'>
            <NavBar></NavBar>
            <CustomTextInput hint={"Name"} input={name} setInputValue={setname} ></CustomTextInput>
            <CustomTextInput hint={"Last Name"} input={lastname} setInputValue={setlastname} ></CustomTextInput>
            <CustomTextInput hint={"Email"} input={email} setInputValue={setemail}></CustomTextInput>
            <CustomTextInput hint={"Password"} input={password} setInputValue={setpassword}></CustomTextInput>
            <CustomTextInput hint={"Client"} input={client} setInputValue={setclient}></CustomTextInput>
            <CustomTextInput hint={"Role 1 or 2"} input={role} setInputValue={setrole}></CustomTextInput>
            <CustomButton title={"save"} handlePress={handleSave}></CustomButton>
        </div>

    );
}

export default AddUserPage;