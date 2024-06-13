import { useContext, createContext } from "react";
import { useState } from "react";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState("");
    const [access, setAccess] = useState(null);
    const getAcces = async (id) => {
        try {
            const accResponse = await fetch('http://localhost:5273/Accessibility/getRoleAccessibility?RoleId=' + id,
                {
                    method: 'GET', headers: {
                        "accept": "text/plain"
                    },
                });
            if (accResponse.status === 200) {
                const accrole = await accResponse.json();
                console.log("accrole");
                console.log(accrole);
                setAccess(accrole);
            }
        } catch (error) {
            console.log("Access error:", error);
        }
    }
    const getRole = async (id) => {
        try {
            const roleResponse = await fetch('http://localhost:5273/Accessibility/getRole?RoleId=' + id, {
                method: 'GET',
                headers: {
                    "accept": "text/plain"
                }
            });
            if (roleResponse.status === 200) {
                const resrole = await roleResponse.json();
                setRole(resrole);
                console.log("resrole");
                console.log(resrole);
            }
        } catch (error) {
            console.error("Role error:", error);
        }
    }
    const loginAction = async (data) => {
        try {
            const response = await fetch('http://localhost:5273/Auth/login/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (response.status === 200) {
                const res = await response.json();
                console.log("res");
                console.log(res);
                setUser(res.user);
                await getRole(res.user.authorizedProducts[0]);
                await getAcces(res.user.authorizedProducts[0]);
                return res.user;
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };
    const logOut = () => {
        setUser(null);
        setAccess(null);
        setRole("");
        console.log("log out");
        console.log(user);
    }

    return <AuthContext.Provider value={{ user, loginAction, logOut, role, access, getAcces, getRole }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};