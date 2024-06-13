import { useAuth } from "./auth-provider";

const UserProvider = () => {
    const auth = useAuth();

    const getUsers = async () => {
        try {
            const response = await fetch('http://localhost:5273/UserList/get', {
                method: 'GET', headers: {
                    "accept": "text/plain"
                },
            });
            if (response.status === 200) {
                const res = await response.json();
                // for (let i = 0; i < res.length; i++) {
                //     var r = await auth.getRole(res[i].authorizedProducts[0]);
                //     res[i].authorizedProducts.push(r.name);
                // }
                if (res) {
                    return res;
                }
            }
        } catch (error) { }
    }

    const delItem = async (user) => {
        try {
            const response = await fetch('http://localhost:5273/UserList/delete',
                {
                    method: 'POST', headers: {
                        "Content-Type": "application/json",
                        "accept": "text/plain"
                    },
                    body: JSON.stringify(user)
                });
            if (response.status === 200) {
                const res = await response.json();
                if (res) {
                    return res;
                }
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    return { getUsers, delItem };
}

export default UserProvider;