import { useEffect, useState } from 'react';
import './add_policy.css';
import CustomTextInput from '../../components/text_input/text_input';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar';
import CustomButton from '../../components/button/custom-button';
import { useAuth } from '../../hooks/auth-provider';
import MesAlert from '../../components/message_alert/message_alert';
import UserProvider from '../../hooks/user-provider';

function AddPolicy() {
    const auth = useAuth();
    const { editItem } = UserProvider();
    const { user } = auth;
    const [premium, setPremium] = useState('');
    const [plate, setPlate] = useState('');
    const [statu, setStatu] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [butColor, setbutColor] = useState(false);
    const { product, no, userId, noList, userInfo } = location.state || {};
    const [pop, setPop] = useState(false);
    const [proname, setproname] = useState("");
    const [index, setIndex] = useState(0);
    const [prono, setprono] = useState('');

    const handleSave = async () => {
        console.log(userId);
        console.log(no);
        console.log(parseFloat(premium));
        console.log(`${user.name} ${user.lastName}`);
        console.log(plate);
        console.log(parseInt(statu, 10));
        console.log("prono");
        console.log(prono);

        const data = {
            userId: userId,
            productNo: prono,
            policyNo: "0",
            premium: parseFloat(premium),
            insured: `${user.name} ${user.lastName}`,
            plate: plate,
            createdDate: new Date().toISOString(),
            statu: parseInt(statu, 10)
        };
        if (noList === null) {
            var dataUpdate = {
                "id": {},
                "uId": userInfo.uId,
                "name": userInfo.name,
                "lastName": userInfo.lastName,
                "client": userInfo.client,
                "authorizedProducts": [...userInfo.authorizedProducts, no],
                "createdDate": Date.now
            };
        }
        console.log(JSON.stringify([data]));
        console.log(JSON.stringify([dataUpdate]));
        try {
            const response = await fetch('http://localhost:5273/Products/add', {
                method: 'POST',
                headers: {
                    "accept": "text/plain",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([data])
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Policy added successfully:', result);
                if (noList === null) {
                    const res2 = await editItem(dataUpdate);
                    console.log('Policy added to user successfully:', res2);
                }
                showAlert();
            } else {
                console.error('Failed to add policy:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getProductName = (p) => {
        setprono(p);
        if (p === "101") {
            return "Kasko";
        } else if (p === "102") {
            return "Sağlık";
        } else if (p === "103") {
            return "Hayat";
        }
    }

    const showAlert = () => {
        setPop(true);
    };

    const OnClick = () => {
        if (noList !== null) {
            if (index === noList.length - 1 || index > noList.length - 1) {
                navigate('/home');
            }
            else {
                setPremium("");
                setPlate("");
                setStatu("");
                setIndex(index + 1);
                setPop(false);
            }
        }
        else { navigate('/home'); }
    };

    useEffect(() => {
        if (noList && index < noList.length) {
            setproname(getProductName(noList[index]));
            setprono(noList[index]);
        } else {
            setproname(product);
            setprono(no);
        }
        setbutColor(premium && plate && statu);
    }, [premium, plate, statu, index, noList, product, no]);

    return (
        <div className='AddPolicy'>
            <NavBar />
            {pop && (
                <MesAlert onClicked={OnClick} message={"Policy added successfully."} />
            )}
            <div>
                <h1>{proname}</h1>
                <CustomTextInput hint="Premium" input={premium} setInputValue={setPremium} />
                <CustomTextInput hint="Plate" input={plate} setInputValue={setPlate} />
                <CustomTextInput hint="Statu" input={statu} setInputValue={setStatu} />
                <div className='buttons'>
                    <CustomButton title="Go Back" handlePress={() => navigate('/home')} />
                    <CustomButton color={butColor} title="Save" handlePress={butColor ? handleSave : null} />
                </div>
            </div>
        </div>
    );
}
export default AddPolicy;

