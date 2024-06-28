import { useEffect, useState } from 'react';
import './add_policy.css';
import CustomTextInput from '../../components/text_input/text_input';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar';
import CustomButton from '../../components/button/custom-button';
import { useAuth } from '../../hooks/auth-provider';
import MesAlert from '../../components/message_alert/message_alert';

function AddPolicy() {
    const auth = useAuth();
    const { user } = auth;
    const [premium, setPremium] = useState('');
    const [plate, setPlate] = useState('');
    const [statu, setStatu] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [butColor, setbutColor] = useState(false);
    const { product, no, userId } = location.state || {};
    const [pop, setPop] = useState(false);


    const handleSave = async () => {
        console.log(userId);
        console.log(no);
        console.log(parseFloat(premium));
        console.log(`${user.name} ${user.lastName}`);
        console.log(plate);
        console.log(parseInt(statu, 10));
        const data = {
            userId: userId,
            productNo: no,
            policyNo: "0",
            premium: parseFloat(premium),
            insured: `${user.name} ${user.lastName}`,
            plate: plate,
            createdDate: new Date().toISOString(),
            statu: parseInt(statu, 10)
        };
        console.log(JSON.stringify([data]));
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
                showAlert();
            } else {
                console.error('Failed to add policy:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const showAlert = () => {
        setPop(true);
    }
    const OnClick = () => {
        navigate('/home');
        setPop(false);
    }
    useEffect(() => {
        setbutColor(premium && plate && statu);
    }, [premium, plate, statu]);

    return (
        <div className='AddPolicy'>
            <NavBar />
            {pop ? (<>
                <MesAlert onClicked={OnClick} message={"Policy added successfully."} ></MesAlert>
            </>) : (null)}
            <h1>{product}</h1>
            <CustomTextInput hint="Premium" input={premium} setInputValue={setPremium} />
            <CustomTextInput hint="Plate" input={plate} setInputValue={setPlate} />
            <CustomTextInput hint="Statu" input={statu} setInputValue={setStatu} />
            <div className='buttons'>
                <CustomButton title="Go Back" handlePress={() => navigate('/home')} />
                <CustomButton color={butColor} title="Save" handlePress={butColor ? handleSave : null} />
            </div>
        </div>
    );
}

export default AddPolicy;
