import { useContext, createContext } from "react";
import { useState } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");

    const loginAction = async (data) => {
        console.log("data:");
        console.log(JSON.stringify(data));
        console.log(data);
        try {
            const response = await fetch('http://localhost:5273/weatherforecast/login/', {
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
        setToken("");
    }
    return <AuthContext.Provider value={{ token, user, loginAction, logOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};