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
    const [load, setLoad] = useState(false);

    const getPolicies = async (id) => {
        setLoad(true);
        try {
            const response = await fetch('http://localhost:5273/Products/getById?uId=' + id, {
                method: 'GET', headers: {
                    "accept": "text/plain"
                },
            });
            if (response.status === 200) {
                const res = await response.json();
                if (res) {
                    setPolicies(res);
                    console.log(res);
                    setLoad(false);
                    return res;
                }

            }
        } catch (error) { console.log(error); }
    }
    useEffect(() => {
        // getPolicies(user.uId);
    }, []);
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
                        {/* {user.authorizedProducts && (
                            <tr>
                                <th className="headings">Authorized Products</th>
                                <td>{user.authorizedProducts.join(', ')}</td>
                            </tr>
                        )} */}
                        {user.roleId && role && (
                            <tr>
                                <th className="headings">Role</th>
                                <td>{role.roleName}</td>
                            </tr>
                        )}
                        {/* {policies !== null && (
                            <>
                                {policies.map((policy, index) => (
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
                        )} */}
                    </table>
                </div>
            </>) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}

export default Userpage;