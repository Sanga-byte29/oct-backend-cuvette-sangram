const URL = import.meta.env.VITE_BACKEND_URL;
export async function register({ name, email, password, mobile }) {
    try {
        const res = await fetch(`${URL}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password, mobile }),
        })
        const data = await res.json();
        const status = res.status;
        return { data, status };
    }
    catch (err) {
        console.log(err);
        throw err;
    }

}
export async function login({ email, password }) {
    try {
        const res = await fetch(`${URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
        const data = await res.json();
        const status = res.status;
        return { data, status };
    }
    catch (err) {
        console.log(err);
        throw err;
    }

}
