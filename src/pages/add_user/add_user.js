import React, { useEffect, useState } from 'react';
import './add_user.css'
import CustomTextInput from '../../components/text_input/text_input';
import CustomButton from '../../components/button/custom-button';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar';
import UserProvider from '../../hooks/user-provider';
import MesAlert from '../../components/message_alert/message_alert';
function AddUserPage() {
    const location = useLocation();
    const { user, isEdit } = location.state || {};
    const [name, setname] = useState(user.name ?? '');
    const [lastname, setlastname] = useState(user.lastName ?? '');
    const [client, setclient] = useState(user.client ?? '');
    const [authorizedProducts, setauthorizedProducts] = useState(user.authorizedProducts ?? '');
    const navigate = useNavigate();
    const { editItem, addUser } = UserProvider();
    const [butColor, setbutColor] = useState(false);
    const [messageTitle, setMessageTitle] = useState("");
    const [pop, setPop] = useState(false);

    const showAlert = () => {
        setPop(true);
    }
    const OnClick = () => {
        navigate('/home');
        setPop(false);
    }

    const generateList = (products) => {
        if (user.authorizedProducts !== products) {
            return products.split(',').map(product => product.trim());
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
            if (user.name !== name || user.lastName !== lastname || user.client !== client || user.authorizedProducts !== authorizedProducts) {
                var res = await editItem(dataUpdate);
                if (res.status === 200) {
                    setMessageTitle("Informations updated successfully.");
                    console.log("başarılı");
                    showAlert();
                }
                else {
                    console.log("başarısız");
                }
            }
            console.log("güncelleme yok");
        }
        else {
            var res = await addUser(data);
            if (res !== null) {
                setMessageTitle("User added successfully.");
                console.log("başarılı");
                if (authorizedProducts !== "") {
                    navigate('/addPolicy', { state: { userId: res.uId, noList: generateList(authorizedProducts) } });
                }
                showAlert();
            }
            else {
                showAlert();
                setMessageTitle("An error occured.");
                console.log("An error occured.");
            }
        }
    }

    useEffect(() => {
        if (name && lastname && client) {
            setbutColor(true);
        } else {
            setbutColor(false);
        }
    }, [name, lastname, client]);
    return (
        <div className='AddUser'>
            <NavBar></NavBar>
            {pop ? (<>
                <MesAlert onClicked={OnClick} message={messageTitle} ></MesAlert>
            </>) : (null)}
            <CustomTextInput hint={"Name"} input={name} setInputValue={setname} ></CustomTextInput>
            <CustomTextInput hint={"Last Name"} input={lastname} setInputValue={setlastname} ></CustomTextInput>
            <CustomTextInput hint={"Client"} input={client} setInputValue={setclient}></CustomTextInput>
            {!isEdit && <CustomTextInput hint={"Authorized Products (with commas)"} input={authorizedProducts} setInputValue={setauthorizedProducts}></CustomTextInput>}
            <div className='buttons'>
                <CustomButton title={"go back"} handlePress={() => { navigate('/home') }}></CustomButton>
                <CustomButton color={butColor} title={"save"} handlePress={(name !== "" && lastname !== "" && client !== "") ? handleSave : () => { }}></CustomButton>
            </div>
        </div>
    );
}

export default AddUserPage;