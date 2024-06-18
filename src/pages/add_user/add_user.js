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
    const [message, setMessage] = useState(false);
    const [butColor, setbutColor] = useState(false);
    const [messageTitle, setMessageTitle] = useState("");
    const updates = [];

    const generateList = (products) => {
        if (user.authorizedProducts !== products) {
            return products.split(',');
        }
        return products;
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
            if (user.name !== name) {
                updates.push(" name ");
            }
            if (user.lastName !== lastname) {
                updates.push(" last name ");
            }
            if (user.client !== client) {
                updates.push(" client ");
            }
            if (user.authorizedProducts !== authorizedProducts) {
                updates.push(" authorized products ");
            }
            else { setMessageTitle("") }
            var res = await editItem(dataUpdate);
            if (res.status === 200) {
                setMessage(true);
                setMessageTitle(updates + "are updated.");
                console.log("başarılı");
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            }
            else {
                console.log("başarısız");
            }
            setMessage(false);
        }
        else {
            var res = await addUser(data);
            if (res.status === 200) {
                setMessage(true);
                setMessageTitle("added");
                console.log("başarılı");
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            }
            else {
                console.log("başarısız");
            }
            setMessage(false);
        }
    }

    useEffect(() => {
        if (name && lastname && client && authorizedProducts) {
            setbutColor(true);
        } else {
            setbutColor(false);
        }
    }, [name, lastname, client, authorizedProducts]);
    return (
        <div className='AddUser'>
            <NavBar></NavBar>
            <CustomTextInput hint={"Name"} input={name} setInputValue={setname} ></CustomTextInput>
            <CustomTextInput hint={"Last Name"} input={lastname} setInputValue={setlastname} ></CustomTextInput>
            <CustomTextInput hint={"Client"} input={client} setInputValue={setclient}></CustomTextInput>
            <CustomTextInput hint={"Authorized Products (with commas)"} input={authorizedProducts} setInputValue={setauthorizedProducts}></CustomTextInput>
            <div className='buttons'>
                <CustomButton title={"go back"} handlePress={() => { navigate('/home') }}></CustomButton>
                <CustomButton color={butColor} title={"save"} handlePress={(name !== "" && lastname !== "" && client !== "" && authorizedProducts !== "") ? handleSave : () => { }}></CustomButton>
            </div>
            <h1>{messageTitle}</h1>
        </div>

    );
}

export default AddUserPage;