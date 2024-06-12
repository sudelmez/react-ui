import React, { useEffect, useState } from 'react';
import './home.css';
import { useAuth } from '../../hooks/auth-provider';
import { useNavigate } from 'react-router-dom';
import AlertShow from '../../components/alert/alert';

function HomePage() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const { user, setUser } = auth;
    const { role, setRole } = auth;
    const { access, setAccess } = auth;
    const [users, setUsers] = useState([]);
    const [pop, setPop] = useState(false);
    const [selectedUser, setselectedUser] = useState({});

    const getUsers = async () => {
        try {
            const response = await fetch('http://localhost:5273/UserList/get', {
                method: 'GET', headers: {
                    "accept": "text/plain"
                },
            });
            if (response.status === 200) {
                const res = await response.json();
                if (res) {
                    setUsers(res);
                    return res;
                }
            }
        } catch (error) { }
    }
    const delItem = (user) => {
        try {
            const response = fetch('http://localhost:5273/UserList/delete',
                {
                    method: 'POST', headers: {
                        "Content-Type": "application/json",
                        "accept": "text/plain"
                    },
                    body: JSON.stringify(user)
                });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const showAlert = () => {
        setPop(true);
    }
    const onClickYes = () => {
        delItem(selectedUser);
        setPop(false);
    }
    const onClickNo = () => {
        setPop(false);
    }
    useEffect(() => {
        setLoad(false);
        getUsers();
    }, []);
    const handlePress = async () => {
        setLoad(true);
        await auth.logOut();
        navigate('/auth');
    }

    return (
        <div className='Home'>
            {pop ? (<>
                <AlertShow onClickedYes={onClickYes} onClickedNo={onClickNo} ></AlertShow>
            </>) : (null)}
            {!load ? (<>
                <div className='left'>
                    <h1>{user.name}</h1>
                    <h1>{user.lastName}</h1>
                    <h1>{role.roleName}</h1>
                    <button onClick={handlePress}>Log Out</button>
                </div>
                {access.seeUserList === true && (
                    <div className='right'>
                        {users.map((userI) => {
                            return <div key={userI.id.toString()} className='comp'>
                                {(userI.email !== user.email) && (
                                    <h2 onClick={() => {
                                        if (access.seeUserDetail === true) { navigate('/user', { state: { user: userI } }); }
                                    }} className="item">
                                        {userI.name + " " + userI.lastName}
                                    </h2>)}
                                {(access.delUser === true && (userI.email !== user.email)) &&
                                    (<button onClick={() => {
                                        showAlert();
                                        setselectedUser(userI);
                                    }}>delete</button>)} </div>;
                        })}
                        {access.addUser === true && (
                            <button onClick={() => {
                                navigate('/addUser');
                            }} className='adduser'>Add User</button>
                        )}
                    </div>
                )}
            </>) : (
                <h1>Loading...</h1>
            )}
        </div>


    );
}

export default HomePage;