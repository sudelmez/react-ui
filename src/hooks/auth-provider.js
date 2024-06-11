import { useContext, createContext } from "react";
import { useState } from "react";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
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
                if (res.user) {
                    setUser(res.user);
                    return res.user;
                }
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };
    const logOut = () => {
        setUser(null);
        console.log("log out");
        console.log(user);
    }
    return <AuthContext.Provider value={{ user, loginAction, logOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};