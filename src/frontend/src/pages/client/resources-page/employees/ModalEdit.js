import styles from './Employees.module.scss'
import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {baseUrl} from "../../../../config/const";

export const ModalEdit = (props) => {

    const [username, setUsername] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (props) {
            setUsername(props.data.username)
            setFirstname(props.data.firstname)
            setLastname(props.data.lastname)
            setEmail(props.data.email)
            setError('')
        }
    }, [props])

    const save = (e) => {
        e.preventDefault();
        let valid = true;
        if (username.trim().length === 0 || firstname.trim().length === 0 || lastname.trim().length === 0 || email.trim().length === 0) {
            setError('Please fill data');
            valid = false;
        }
        if (valid) {
            axios.post(
                `${baseUrl}/`//TODO
            ).then(
                () => {
                    props.onClose()
                    window.location.reload()//TODO mozna nebude potreba
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    console.log(resMessage);
                    setError(resMessage);
                }
            )
        }
    }


    if (!props.show) return null;

    return (
        <div className={styles.modalContainer} onClick={props.onClose}>
            <form className={styles.content} onSubmit={(e) => save(e)} onClick={(e) => e.stopPropagation()}>
                <h1>Edit</h1>
                <label>
                    Firstname
                    <input
                        className={'input-primary '.concat(error.length > 0 ? 'error' : '')}
                        type={'text'}
                        value={firstname}
                        onChange={e => {
                            setFirstname(e.target.value)
                            setError('')
                        }}
                    />
                </label>
                <label>
                    Lastname
                    <input
                        className={'input-primary '.concat(error.length > 0 ? 'error' : '')}
                        type={'text'}
                        value={lastname}
                        onChange={e => {
                            setLastname(e.target.value)
                            setError('')
                        }}
                    />
                </label>
                <label>
                    Username
                    <input
                        className={'input-primary '.concat(error.length > 0 ? 'error' : '')}
                        type={'text'}
                        value={username}
                        onChange={e => {
                            setUsername(e.target.value)
                            setError('')
                        }}
                    />
                </label>
                <label>
                    Email
                    <input
                        className={'input-primary '.concat(error.length > 0 ? 'error' : '')}
                        type={'text'}
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value)
                            setError('')
                        }}
                    />
                </label>
                <div className={styles.error}>
                    {error}
                </div>
                <button type={'submit'}>Save</button>
            </form>
        </div>
    )
}