const UserProvider = () => {
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
    const addUser = async (user) => {
        try {
            const response = await fetch('http://localhost:5273/UserList/add', {
                method: 'POST', headers: {
                    "accept": "*/*",
                    "Content-Type": "application/json"
                }, body: JSON.stringify(user)
            });
            if (response.status === 200) {
                return response;
            }
        } catch (error) {
            console.log(error);
        }
    }
    const editItem = async (user) => {
        try {
            const response = await fetch('http://localhost:5273/UserList/update',
                {
                    method: 'POST', headers: {
                        "Content-Type": "application/json",
                        "accept": "text/plain"
                    },
                    body: JSON.stringify(user)
                });
            if (response.status === 200) {
                return response;
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    return { getUsers, delItem, editItem, addUser };
}

export default UserProvider;