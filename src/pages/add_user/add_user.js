import React, { useEffect, useState } from 'react';
import './add_user.css'
import CustomTextInput from '../../components/text_input/text_input';
import CustomButton from '../../components/button/custom-button';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar';
import UserProvider from '../../hooks/user-provider';
function AddUserPage() {
    const location = useLocation();
    const { user, isEdit } = location.state || {};
    const [name, setname] = useState(user.name ?? '');
    const [lastname, setlastname] = useState(user.lastName ?? '');
    const [client, setclient] = useState(user.client ?? '');
    const [authorizedProducts, setauthorizedProducts] = useState(user.authorizedProducts ?? '');
    const navigate = useNavigate();
    const { editItem, addUser } = UserProvider();

    const generateList = (products) => {
        return products.split(',');
    }
    const handleSave = async () => {
        var data = {
            "id": {},
            "uId": user.uId ?? "",
            "name": name,
            "lastName": lastname,
            "client": client,
            "authorizedProducts": generateList(authorizedProducts),
            "createdDate": Date.now
        };
        var dataUpdate = {
            "id": {},
            "uId": user.uId ?? "",
            "name": name,
            "lastName": lastname,
            "client": client,
            "authorizedProducts": generateList(authorizedProducts),
            "createdDate": Date.now
        };
        if (isEdit === true) {
            editItem(dataUpdate).then(() => {
                navigate('/home');
            });
        }
        else {
            addUser(data).then(() => {
                navigate('/home');
            });
        }
    }

    useEffect(() => {
        console.log(user);
    },);
    return (
        <div className='AddUser'>
            <NavBar></NavBar>
            <CustomTextInput hint={"Name"} input={name} setInputValue={setname} ></CustomTextInput>
            <CustomTextInput hint={"Last Name"} input={lastname} setInputValue={setlastname} ></CustomTextInput>
            <CustomTextInput hint={"Client"} input={client} setInputValue={setclient}></CustomTextInput>
            <CustomTextInput hint={"Authorized Products (with commas)"} input={authorizedProducts} setInputValue={setauthorizedProducts}></CustomTextInput>
            <CustomButton title={"save"} handlePress={handleSave}></CustomButton>
        </div>

    );
}

export default AddUserPage;