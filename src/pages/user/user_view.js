import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './user_view.css'
import NavBar from '../../components/navbar/navbar';
import { useAuth } from '../../hooks/auth-provider';

function Userpage() {
    const location = useLocation();
    const { user } = location.state || {};
    const { role } = useAuth();
    const [policies, setPolicies] = useState([]);
    const [load, setLoad] = useState(true);
    const [value, setValue] = useState(0);

    const getPolicies = async (id) => {
        try {
            const response = await fetch('http://localhost:5273/Products/getById?uId=' + id, {
                method: 'GET', headers: {
                    "accept": "text/plain"
                },
            });
            console.log("response");
            console.log(response);
            if (response.status === 200) {
                setValue(1);
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
        if (value !== 1) {
            fetchData();
            async function fetchData() {
                getPolicies(user.uId);
                console.log("policies");
                console.log(policies);
            }
        }
        setLoad(false);
    }, [value]);
    return (
        <div>
            <NavBar></NavBar>
            {!load ? (<>
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
                        {user.roleId && role && (
                            <tr>
                                <th className="headings">Role</th>
                                <td>{role.roleName}</td>
                            </tr>
                        )}
                        {policies !== null && (
                            <> {policies.map((policy, index) => (
                                <tr key={index}>
                                    <th className="headings">Insurance {index + 1}</th>
                                    <td>
                                        <div>Product No: {policy.productNo}</div>
                                        <div>Policy No: {policy.policyNo}</div>
                                        <div>Premium: {policy.premium}</div>
                                        <div>Insured: {policy.insured}</div>
                                        <div>Plate: {policy.plate}</div>
                                    </td>
                                </tr>
                            ))}
                            </>
                        )}
                    </table>
                </div>
            </>) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}

export default Userpage;