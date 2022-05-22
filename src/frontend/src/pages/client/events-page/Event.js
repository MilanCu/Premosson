import styles from './EventsPage.module.scss'
import axios from "axios";
import {baseUrl} from "../../../config/const";

export const Event = (props) => {

    console.log(props.data)

    const deleteEvent = () => {
        axios.delete(
            `${baseUrl}`
        ).then(r =>
            props.onClose
        )
    }

    return (
        <div className={styles.modal} onClick={props.onClose}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <h2>Event: {props.data.name}</h2>
                <h3>Day: {props.data.startDate}</h3>
                <h3>
                    From: {props.data.fromTime}
                    <span> </span>
                    To: {props.data.toTime}
                </h3>
                <div className={styles.btns}>
                    <button type={'button'} className={'button-primary'} onClick={props.onClose}>Back</button>
                    {/*<button type={'button'} className={'button-primary-outline'} onClick={() => deleteEvent()}>Delete*/}
                    {/*    event*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
    )
}