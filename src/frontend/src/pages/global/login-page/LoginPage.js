import styles from './LoginPage.module.scss'
import {useEffect, useState} from "react";
import AuthService from "../../../services/auth.service";
import {useNavigate} from "react-router-dom";

const Form = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    let navigate = useNavigate();

    useEffect(() => {
        AuthService.logout();
    }, [])

    const validation = (e) => {
        e.preventDefault();
        if (username.length === 0 || password.length === 0) {
            setError('Please fill in the missing data');
            e.preventDefault();
        } else {
            AuthService.login(username, password).then(() => {
                navigate('/app/dashboard');
                window.location.reload();
            }, (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                console.log(resMessage);
                setError(resMessage);
            });
        }
    }

    return (<form className={styles.form}>
        <div className={styles.topContent}>
            <p>Don't you have an account?</p>
            <a href={'/registration'}>
                <button className={'button-primary-outline'} type={'button'}>Registration</button>
            </a>
        </div>
        <div className={styles.bodyContent}>
            <p className={styles.topic}>Login</p>
            <label>
                Username
                <input value={username} required={true} onChange={(e) => {
                    setUsername(e.target.value)
                    setError('')
                }} type={'text'} className={'input-primary-full '.concat(error.length !== 0 ? 'error' : '')}
                       placeholder={'Milancu'}/>
            </label>
            <label>
                Password
                <input value={password} required={true} onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                }} type={'password'} className={'input-primary-full '.concat(error.length !== 0 ? 'error' : '')}/>
            </label>
        </div>
        <div className={styles.errorMessage}>{error}</div>
        <div className={styles.bottomContent}>
            <button type={'submit'} className={'button-primary'} onClick={(e) => {
                validation(e)
            }}>Login
            </button>
        </div>
    </form>)
}

export const LoginPage = () => {
    return (<div className={styles.container}>
        <Form/>
    </div>)
}