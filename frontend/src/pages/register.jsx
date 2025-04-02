import React from 'react'
import { useState } from 'react'
import { register } from '../services'
export default function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
    })
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.name.trim().length === 0 || user.email.trim().length === 0 || user.mobile.trim().length === 0 || user.password.trim().length === 0) {
            alert('please fill all fields')
            return
        }
        const res = await register(user)
        alert(res.data.message)
    }
    return (
        <>
            register
            <form>
                <input onChange={handleChange} type="text" name='name' placeholder="name" value={user.name} />
                <input name='email' type="text" placeholder="email" value={user.email} onChange={handleChange} />
                <input type="text" name='mobile' placeholder="mobile" value={user.mobile} onChange={handleChange} />
                <input type="password" name='password' placeholder="password" value={user.password} onChange={handleChange} />
                <button onClick={handleSubmit}>register</button>
            </form>

        </>
    )
}