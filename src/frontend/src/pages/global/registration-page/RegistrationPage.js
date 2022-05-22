import styles from './RegistrationPage.module.scss'
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthService from "../../../services/auth.service";
import authHeader from "../../../services/auth-header";
import {baseUrl} from "../../../config/const";
import axios from "axios";
import authService from "../../../services/auth.service";

const Form = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');
    const [userType, setUserType] = useState(1);
    const [system, setSystem] = useState('');

    const [provider, setProvider] = useState(false);
    const [customer, setCustomer] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        AuthService.logout();
    }, [])

    const valid = (e) => {
        e.preventDefault();

        let valid = true;

        if (firstname.trim().length === 0 || lastname.trim().length === 0 || username.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || rePassword.trim().length === 0) {
            setError('Please fill in the missing data')
            valid = false;
            e.preventDefault()
        } else {
            const regex = /[^a-zA-ZÀ-Žà-ž]/;
            if (firstname.trim().length >= 2) {
                if (firstname.match(regex)) {
                    setError("Incorrect first name format.")
                    valid = false;
                    e.preventDefault();
                    return;

                }
            } else {
                setError("First name is too short")
                valid = false;
                e.preventDefault();
                return;
            }
            if (lastname.trim().length >= 2) {
                if (lastname.match(regex)) {
                    setError("Incorrect last name format.")
                    valid = false;
                    e.preventDefault();
                    return;
                }
            } else {
                setError("Last name is too short")
                valid = false;
                e.preventDefault();
                return;
            }
            if (username.trim().length >= 4) {
                if (lastname.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/)) {
                    setError("Incorrect last name format.")
                    valid = false;
                    e.preventDefault();
                    return;
                }
            } else {
                setError("Username is too short")
                valid = false;
                e.preventDefault();
                return;
            }
            if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                setError("Incorrect email format.")
                valid = false;
                e.preventDefault();
                return;
            }
            if (password.trim().length >= 6) {
                if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
                    setError("Password must contain at least one capital letter and at least one number.")
                    valid = false;
                    e.preventDefault();
                    return;
                }
            } else {
                setError("Password is too short")
                valid = false;
                e.preventDefault();
                return;
            }
            if (rePassword !== password) {
                setError("Passwords do not match")
                valid = false;
                e.preventDefault();
                return;
            }
        }

        if (valid) {
            AuthService.register(firstname, lastname, username, email, password, userType).then(() => {
                if (userType === 1) {
                    authService.login(username, password).then(() => {
                        axios.post(`${baseUrl}/systems`, {
                            "managers": [username], "name": system
                            // @ts-ignore
                        }, {headers: authHeader()}).then(() => {
                            navigate("/app/dashboard");
                            window.location.reload();
                        })
                    })
                } else {
                    navigate("/login");
                    window.location.reload();
                }
            }, (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                console.log(resMessage);
                setError(resMessage);
            });
        }
    }

    return (<React.Fragment>
        <form className={styles.form}>
            <div className={styles.bodyContent}>
                <p className={styles.topic}>Registrace</p>
                <div className={styles.flex}>
                    <label>
                        Firstname
                        <input value={firstname} required onChange={(e) => {
                            setFirstname(e.target.value)
                            setError('')
                        }} type={'text'} className={'input-primary-full '.concat(error.length !== 0 ? 'error' : '')}
                               placeholder={'Milan'}/>
                    </label>
                    <label>
                        Lastname
                        <input value={lastname} required onChange={(e) => {
                            setLastname(e.target.value)
                            setError('')
                        }} type={'text'} className={'input-primary-full '.concat(error.length !== 0 ? 'error' : '')}
                               placeholder={'Cu'}/>
                    </label>
                </div>
                <div className={styles.flex}>
                    <label>
                        Username
                        <input value={username} required onChange={(e) => {
                            setUsername(e.target.value)
                            setError('')
                        }} type={'text'} className={'input-primary-full '.concat(error.length !== 0 ? 'error' : '')}
                               placeholder={'Milancu'}/>
                    </label>
                    <label>
                        Email
                        <input value={email} required onChange={(e) => {
                            setEmail(e.target.value)
                            setError('')
                        }} type={'email'}
                               className={'input-primary-full '.concat(error.length !== 0 ? 'error' : '')}
                               placeholder={'milancu@premosson.com'}/>
                    </label>
                </div>
                <div className={styles.flex}>
                    <label>
                        Password
                        <input value={password} required onChange={(e) => {
                            setPassword(e.target.value)
                            setError('')
                        }} type={'password'}
                               className={'input-primary-full '.concat(error.length !== 0 ? 'error' : '')}/>
                    </label>
                    <label>
                        Repeat password
                        <input value={rePassword} required onChange={(e) => {
                            setRePassword(e.target.value)
                            setError('')
                        }} type={'password'}
                               className={'input-primary-full '.concat(error.length !== 0 ? 'error' : '')}/>
                    </label>
                </div>
                <div className={styles.radios}>
                    <label
                        onMouseOver={() => {
                            setProvider(true)
                        }}
                        onMouseLeave={() => {
                            setProvider(false)
                        }}
                    >
                        Provider
                        <input type="radio" name="userType" value={1} required
                               checked={userType === 1 ?? "checked"} onChange={() => setUserType(1)}/>
                    </label>
                    <label
                        onMouseOver={() => {
                            setCustomer(true)
                        }}
                        onMouseLeave={() => {
                            setCustomer(false)
                        }}
                    >
                        Customer
                        <input type="radio" name="userType" value={2} onChange={() => setUserType(2)} required/>
                    </label>
                </div>
            </div>
            {userType === 1 ? <label>
                System name
                <input value={system} required onChange={(e) => {
                    setSystem(e.target.value)
                    setError('')
                }} type={'text'}
                       className={'input-primary-full '.concat(error.length !== 0 ? 'error' : '')}
                       placeholder={"Noname System"}
                />
            </label> : null}
            <div className={styles.errorMessage}>{error}</div>
            <div className={styles.bottomContent}>
                <button type={'submit'} className={'button-primary'} onClick={(e) => {
                    valid(e)
                }}>Register
                </button>
            </div>
        </form>
        {provider ?
            <div className={styles.tooltipP}>Provider account <br/>is used for <br/> people who want to <br/>provide
                reservations.</div> : <></>}
        {customer ?
            <div className={styles.tooltipC}>Customer account is<br/> kind of account that is <br/>used just for
                making<br/> reservations.</div> : <></>}
    </React.Fragment>)
}

export const RegistrationPage = () => {
    return (<div className={styles.container}>
        <Form/>
    </div>)
}