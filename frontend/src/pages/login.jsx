import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import { login } from '../services';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email: formData.email, password: formData.password })
            if (res.status === 200) {
                alert("Login successful")
                console.log(res)
                window.localStorage.setItem("token", res.data.token)
                navigate("/jobs")
            }
            else {
                alert(res.data.message)
            }
        }
        catch {
            alert("Something went wrong")
        }
        console.log('Login attempt:', formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className={styles.container}>
            <section className={styles.formSection}>
                <h1 className={styles.title}>Already have an account?</h1>
                <p className={styles.subtitle}>Your personal job finder is here</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={styles.input}
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className={styles.input}
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className={styles.button}>
                        Sign in
                    </button>
                </form>

                <p className={styles.signUpText}>
                    Don't have an account?
                    <Link to="/register" className={styles.signUpLink}>
                        Sign Up
                    </Link>
                </p>
            </section>

            <section className={styles.imageSection}>
                <h2 className={styles.imageTitle}>Your Personal Job Finder</h2>
            </section>
        </div>
    );
}