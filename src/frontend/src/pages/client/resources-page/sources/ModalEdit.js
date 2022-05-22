import styles from './Sources.module.scss'
import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {baseUrl} from "../../../../config/const";

export const ModalEdit = (props) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [place, setPlace] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (props) {
            setName(props.data.name)
            setDescription(props.data.description)
            setPlace(props.data.place)
            setError('')
        }
    }, [props])

    const save = (e) => {
        e.preventDefault();
        let valid = true;
        if (name.trim().length === 0 || description.trim().length === 0 || place.trim().length === 0) {
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
                    console.log('ahoj')
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
                    Name
                    <input
                        className={'input-primary '.concat(error.length > 0 ? 'error' : '')}
                        type={'text'}
                        value={name}
                        onChange={e => {
                            setName(e.target.value)
                            setError('')
                        }}
                    />
                </label>
                <label>
                    Description
                    <input
                        className={'input-primary '.concat(error.length > 0 ? 'error' : '')}
                        type={'text'}
                        value={description}
                        onChange={e => {
                            setDescription(e.target.value)
                            setError('')
                        }}
                    />
                </label>
                <label>
                    Place
                    <input
                        className={'input-primary '.concat(error.length > 0 ? 'error' : '')}
                        type={'text'}
                        value={place}
                        onChange={e => {
                            setPlace(e.target.value)
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