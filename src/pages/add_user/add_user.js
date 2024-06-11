import React, { useState } from 'react';
import './add_user.css'
import CustomTextInput from '../../components/text_input/text_input';
import CustomButton from '../../components/button/custom-button';
function AddUserPage() {
    const [UId, setUId] = useState('');
    const [name, setname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [client, setclient] = useState('');
    const handleSave = async () => {
        console.log(name);
        console.log(lastname);
        console.log(UId);
        console.log(email);
        console.log(password);
        console.log(client);
        var data = {
            "id": {},
            "uId": UId,
            "email": email,
            "name": name,
            "password": password,
            "lastName": lastname,
            "token": "12345",
            "client": client,
            "authorizedProducts": [""],
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
                const res = await response.json();
                if (res) {
                    return res;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='AddUser'>
            <CustomTextInput hint={"UId"} input={UId} setInputValue={setUId} ></CustomTextInput>
            <CustomTextInput hint={"Name"} input={name} setInputValue={setname} ></CustomTextInput>
            <CustomTextInput hint={"Last Name"} input={lastname} setInputValue={setlastname} ></CustomTextInput>
            <CustomTextInput hint={"Email"} input={email} setInputValue={setemail}></CustomTextInput>
            <CustomTextInput hint={"Password"} input={password} setInputValue={setpassword}></CustomTextInput>
            <CustomTextInput hint={"Client"} input={client} setInputValue={setclient}></CustomTextInput>
            <CustomButton title={"save"} handlePress={handleSave}></CustomButton>
        </div>

    );
}

export default AddUserPage;