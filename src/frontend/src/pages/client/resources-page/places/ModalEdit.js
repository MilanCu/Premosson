import styles from './Places.module.scss'
import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {baseUrl} from "../../../../config/const";

export const ModalEdit = (props) => {

    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [id, setId] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (props) {
            setCity(props.data.city)
            setStreet(props.data.street)
            setId(props.data.id)
            setError('')
        }
    }, [props])

    const save = (e) => {
        e.preventDefault();
        let valid = true;
        if (city.trim().length === 0 || street.trim().length === 0) {
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
                    City
                    <input
                        className={'input-primary '.concat(error.length > 0 ? 'error' : '')}
                        type={'text'}
                        value={city}
                        onChange={e => {
                            setCity(e.target.value)
                            setError('')
                        }}
                    />
                </label>
                <label>
                    Street
                    <input
                        className={'input-primary '.concat(error.length > 0 ? 'error' : '')}
                        type={'text'}
                        value={street}
                        onChange={e => {
                            setStreet(e.target.value)
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