import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './user_view.css'
import NavBar from '../../components/navbar/navbar';
import { useAuth } from '../../hooks/auth-provider';

function Userpage() {
    const location = useLocation();
    const { user } = location.state || {};
    const { role } = useAuth();
    const [policies, setPolicies] = useState();
    
    const getPolicies = async (id) => {
        try {
            const response = await fetch('http://localhost:5273/Products/getById?uId=' + id, {
                method: 'GET', headers: {
                    "accept": "text/plain"
                },
            });
            console.log(response);
            if (response.status === 200) {
                const res = await response.json();
                if (res) {
                    setPolicies(res);
                    console.log(res);
                    return res;
                }
            }
        } catch (error) { console.log(error); }
    }
    useEffect(() => {
        getPolicies(user.uId);
    }, []);
    return (
        <div>
            <NavBar></NavBar>
            <div className='User'>
                <table>
                    <tr>
                        <th className="headings">Name</th>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <th className="headings">Last Name</th>
                        <td>{user.lastName}</td>
                    </tr>
                    {user.client && (<tr>
                        <th className="headings">Client</th>
                        <td>{user.client}</td>
                    </tr>)}
                    {user.authorizedProducts && (
                        <tr>
                            <th className="headings">Authorized Products</th>
                            <td>{user.authorizedProducts}</td>
                        </tr>
                    )}
                    {user.roleId && role && (
                        <tr>
                            <th className="headings">Role</th>
                            <td>{role.roleName}</td>
                        </tr>
                    )}
                </table>
            </div>
        </div>

    );
}

export default Userpage;