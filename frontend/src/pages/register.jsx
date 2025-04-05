import React from 'react'
import { useState } from 'react'
import { register } from '../services'
import { Link } from 'react-router-dom'
import styles from './register.module.css'

export default function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
    })
    const [acceptTerms, setAcceptTerms] = useState(false)

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!acceptTerms) {
            alert('Please accept the terms and privacy policy')
            return
        }
        if (user.name.trim().length === 0 || user.email.trim().length === 0 || user.mobile.trim().length === 0 || user.password.trim().length === 0) {
            alert('Please fill all fields')
            return
        }
        const res = await register(user)
        alert(res.data.message)
    }

    return (
        <div className={styles.container}>
            <div className={styles.formSection}>
                <h1 className={styles.title}>Create an account</h1>
                <p className={styles.subtitle}>Your personal job finder is here</p>

                <form className={styles.form}>
                    <input
                        className={styles.input}
                        onChange={handleChange}
                        type="text"
                        name='name'
                        placeholder="Name"
                        value={user.name}
                    />
                    <input
                        className={styles.input}
                        name='email'
                        type="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange}
                    />
                    <input
                        className={styles.input}
                        type="text"
                        name='mobile'
                        placeholder="Mobile"
                        value={user.mobile}
                        onChange={handleChange}
                    />
                    <input
                        className={styles.input}
                        type="password"
                        name='password'
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                    />

                    <div className={styles.termsContainer}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                        />
                        <span>By creating an account, I agree to our terms of use and privacy policy</span>
                    </div>

                    <button className={styles.button} onClick={handleSubmit}>Create Account</button>

                    <p className={styles.signInText}>
                        Already have an account?
                        <Link to="/login" className={styles.signInLink}>Sign In</Link>
                    </p>
                </form>
            </div>

            <div className={styles.imageSection}>
                <h2 className={styles.imageTitle}>Your Personal Job Finder</h2>
            </div>
        </div>
    )
}
