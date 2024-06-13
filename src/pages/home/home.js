import React, { useEffect, useState } from 'react';
import './home.css';
import { useAuth } from '../../hooks/auth-provider';
import { useNavigate } from 'react-router-dom';
import AlertShow from '../../components/alert/alert';
import NavBar from '../../components/navbar/navbar';
import UserProvider from '../../hooks/user-provider';

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
    const { getUsers, delItem } = UserProvider();
    const [edit, setEdit] = useState(false);

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
        setLoad(true);
        fetchData();
        async function fetchData() {
            const usersData = await getUsers();
            setUsers(usersData);
        }
        setLoad(false);
    }, [load]);
    const handlePress = async () => {
        setLoad(true);
        await auth.logOut();
        navigate('/auth');
    }

    return (
        <div className='Home'>
            <NavBar name={user.name}></NavBar>
            {pop ? (<>
                <AlertShow onClickedYes={onClickYes} onClickedNo={onClickNo} ></AlertShow>
            </>) : (null)}
            {!load ? (<>
                {access.seeUserList === true && (
                    <div className='colItems'>
                        <h3 onClick={() => {
                            setEdit(!edit);
                        }} className='editButton'>Edit</h3>
                        <table>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Last Name</th>
                                <th>Role</th>
                                {edit &&
                                    (<th>Editing...</th>)
                                }
                            </tr>
                            {users.map((u, index) => {
                                return <tr>
                                    <td>{index + 1}</td>
                                    <td>{u.name}</td>
                                    <td>{u.lastName}</td>
                                    <td>{role.name}</td>
                                    {edit &&
                                        (<td onClick={() => {
                                            showAlert();
                                            setselectedUser(u);
                                        }}>Delete</td>)
                                    }
                                </tr>
                            })}
                        </table>
                    </div>
                )}
                {/* <div className='left'>
                    <div className='container'>
                        <h1>{user.name}</h1>
                        <h1>{user.lastName}</h1>
                        <h1>role: {role.roleName}</h1>
                    </div>
                    <button className='buttonLogout' onClick={handlePress}>Log Out</button>
                </div>
                <div className='middle'>
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
                        <h2 className='item'></h2>
                        {access.addUser === true && (
                            <button onClick={() => {
                                navigate('/addUser', { state: { users: users } });
                            }} className='buttonDel'>Add User</button>
                        )}</div>
                )} */}
            </>) : (
                <h1>Loading...</h1>
            )}

        </div>
    );
}

export default HomePage;