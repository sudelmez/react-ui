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
    const [load, setLoad] = useState(true);
    const { access } = auth;
    const [users, setUsers] = useState([]);
    const [pop, setPop] = useState(false);
    const [selectedUser, setselectedUser] = useState({});
    const { getUsers, delItem } = UserProvider();

    const showAlert = () => {
        setPop(true);
    }
    const onClickYes = async () => {
        setPop(false);
        setLoad(!load);
        const success = await delItem(selectedUser);
        if (success) {
            setUsers(users.filter(user => user.uId !== selectedUser.uId));
        }
        setLoad(!load);
    }
    const onClickNo = () => {
        setPop(false);
    }
    useEffect(() => {
        fetchData();
        async function fetchData() {
            const usersData = await getUsers();
            setUsers(usersData);
            setLoad(false);
        }
    }, [load]);
    return (<div className='Home'>
        <NavBar ></NavBar>{pop ? (<>
            <AlertShow onClickedYes={onClickYes} onClickedNo={onClickNo} ></AlertShow>
        </>) : (null)}
        {!load ? (<>
            <div className='colItems'>
                <table>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Products</th>
                        <th>Client</th>
                        {access.delUser && (
                            <th>Settings</th>
                        )}
                        {access.addPolicy && (
                            <th>Policy</th>
                        )}
                    </tr>
                    {users.map((u, index) => {
                        return <tr>
                            <td className='detailNav' onClick={() => { access.seeUserDetail === true && navigate('/user', { state: { user: u } }) }}>{index + 1}</td>
                            <td>{u.name}</td>
                            <td>{u.lastName}</td>
                            <td>{u.authorizedProducts.join(' ')}</td>
                            <td>{u.client}</td>
                            {access.delUser === true && <td className='rowItems'>
                                <td className='delButton' onClick={() => {
                                    navigate('/addUser', { state: { user: u, isEdit: true } })
                                }}>edit</td>
                                <td className='delButton' onClick={async () => {
                                    setselectedUser(u);
                                    showAlert();
                                }}>delete</td>
                            </td>}
                            {access.addPolicy === true && <td>
                                <td className='addButton' onClick={() => {
                                    navigate('/selectPolicy', { state: { userId: u.uId, userInfo: u } })
                                }}>add</td>
                            </td>}</tr>
                    })}</table></div></>) : (
            <h1>Loading...</h1>
        )}

    </div>
    );
}

export default HomePage;