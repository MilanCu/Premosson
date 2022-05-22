import styles from './Places.module.scss'
import {useEffect, useState} from "react";
import axios from "axios";
import {baseUrl} from "../../../../config/const";

export const ModalDelete = (props) => {

    const [error, setError] = useState('')

    useEffect(() => {
        if (props) {
            setError('')
        }
    }, [props])

    const deleteData = () => {
        axios.post(
            `${baseUrl}/`//TODO
        ).then(
            () => {
                props.onClose()
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

    if (!props.show) return null;

    return (
        <div className={styles.modalContainer} onClick={props.onClose}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <h2>Are You sure?</h2>
                <div className={styles.error}>{error}</div>
                <button type={'button'} onClick={() => deleteData()}>Yes</button>
                <button type={'button'} onClick={props.onClose}>Cancel</button>
            </div>
        </div>
    )
}