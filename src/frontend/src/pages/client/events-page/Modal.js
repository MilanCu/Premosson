import React, {useEffect, useState} from 'react';
import styles from "./EventsPage.module.scss";

import fullSek from "./../../../assets/fullsekvence 1.png";
import lib from "./../../../assets/libovolny 1.png";
import axios from "axios";
import {baseUrl} from "../../../config/const";
import authHeader from "../../../services/auth-header";

export const Modal = (props) => {

    const [name, setName] = useState('');
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [seatAmount, setSeatAmount] = useState(1);
    const [eventType, setEventType] = useState(1)
    const [resources, setResources] = useState([]);
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    const newSeatEvent = (sourceId, name, timeFrom, timeTo, startDate, seat) => {
        return axios.post(`${baseUrl}/categories/${sourceId}/events`, {
            "name": name,
            "fromTime": timeFrom,
            "toTime": timeTo,
            "startDate": startDate,
            "repeatUntil": startDate,
            "day": 3,
            "repetition": "DAILY",
            "categoryId": "0",
            "seatAmount": seat,
        }, {
            headers: authHeader()
        })
    }

    const newIntervalEvent = (sourceId, name, timeFrom, timeTo, startDate) => {
        return axios.post(`${baseUrl}/categories/${sourceId}/events`, {
            "name": name,
            "fromTime": timeFrom,
            "toTime": timeTo,
            "startDate": startDate,
            "repeatUntil": startDate,
            "day": 6,
            "repetition": "DAILY",
            "categoryId": "0",
            "minimalReservationTime": 0,
        }, {
            headers: authHeader()
        })
    }


    useEffect(() => {
        const today = () => {
            const today = new Date();
            const year = today.getFullYear();
            let month = "";
            let date = "";
            if (today.getMonth() < 10) {
                month = "0" + Number(today.getMonth() + 1);
            } else {
                month = today.getMonth();
            }
            if (today.getDate() < 10) {
                date = "0" + Number(today.getMonth() + 1);
            } else {
                date = today.getDate();
            }
            const day = year + "-" + month + "-" + date;
            return day;
        }
        setStartDate(today)

        const fetchSources = () => {
            return axios.get(
                `${baseUrl}/systems/my/sources`,
                {headers: authHeader()})
        }
        fetchSources().then(r => setResources(r.data))

    }, [])


    const handle = () => {
        if (!toTime) {
            console.log(toTime)
            setError("Please choose to time")
        }
        if (!fromTime) {
            setError("Please choose from time")
        }
        if (toTime && fromTime) {
            if (toTime < fromTime) {
                setError("Invalid time")
            }
        }
        if (name.trim().length !== 0) {
            if (JSON.parse(data) === "None") {
                console.log("Please choose a Source")
            } else {
                if (eventType === 1) {
                    newIntervalEvent(JSON.parse(data).address.id, name, fromTime, toTime, startDate).then(() => {
                        props.closeModal()
                        alert("Success 🤌")
                        window.location.reload()
                    })
                } else if (eventType === 2) {
                    newSeatEvent(JSON.parse(data).address.id, name, fromTime, toTime, startDate, seatAmount).then(() => {
                        props.closeModal()
                        alert("Success 🤌")
                        window.location.reload()
                    })
                }
            }
        } else {
            setError("Please fill data")
        }
    }

    const Seat = () => {
        return (
            <div className={styles.flex}>
                <label>
                    <div>
                        Seat capacity
                        <input type={"number"}
                               value={seatAmount}
                               onChange={e => setSeatAmount(e.target.value)}/>
                    </div>
                </label>
            </div>
        )
    }

    return (
        <div className={styles.modalBackground} onClick={props.closeModal}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalBody}>
                    <form>
                        <fieldset className={styles.eventType}>
                            <legend><h3>Choose event type</h3></legend>
                            <div>
                                <label htmlFor="custom">
                                    <img src={lib} alt={"eventType"}/>
                                    <div>
                                        <input type="radio" id="custom" name={"event"} value="custom"
                                               checked={eventType === 1}
                                               onChange={(e) => setEventType(1)}
                                        />Custom type
                                    </div>
                                </label>
                            </div>

                            <div>
                                <label htmlFor="sequence">
                                    <img src={fullSek} alt={"eventType"}/>
                                    <div>
                                        <input type="radio" id="sequence" name={"event"} value="sequence"
                                               checked={eventType === 2}
                                               onChange={(e) => setEventType(2)}
                                        />
                                        Seat
                                    </div>
                                </label>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend><h3>Event name</h3></legend>
                            <label>
                                <div>
                                    <input type={"text"} className={'input-primary'} value={name}
                                           required={true}
                                           onChange={e => setName(e.target.value)} placeholder={"Hokej"}/>
                                </div>
                            </label>
                        </fieldset>
                        <fieldset className={styles.when}>
                            <legend><h3>When?</h3></legend>
                            <div className={styles.flex}>
                                <label>
                                    <div>
                                        V období:
                                        <input type={"date"}
                                               value={startDate}
                                               required={true}
                                               onChange={e => setStartDate(e.target.value)}/>
                                    </div>
                                </label>

                                <label>
                                    <div>
                                        From?
                                        <input type={"time"}
                                               value={fromTime}
                                               max={toTime}
                                               onChange={e => {
                                                   setFromTime(e.target.value)
                                                   if (toTime < e.target.value) {
                                                       setToTime(e.target.value)
                                                   }
                                               }}/>
                                    </div>
                                </label>

                                <label>
                                    <div>
                                        To?
                                        <input type={"time"}
                                               value={toTime}
                                               required={true}
                                               min={fromTime}
                                               onChange={e => {
                                                   setToTime(e.target.value)
                                                   if (fromTime > e.target.value) {
                                                       setFromTime(e.target.value)
                                                   }
                                               }}/>
                                    </div>
                                </label>
                            </div>
                            {eventType === 2 ? <Seat/> : null}
                        </fieldset>
                        <fieldset>
                            <legend><h3>What?</h3></legend>
                            <select className={'input-primary'} onChange={(e) => setData(e.target.value)}>
                                <option value={JSON.stringify("None")}>
                                    None
                                </option>
                                {resources.map(resource => {
                                    return (
                                        <option value={JSON.stringify(resource)}>
                                            {resource.name} {" "}
                                            {resource.description}
                                        </option>
                                    )
                                })}
                            </select>
                        </fieldset>
                    </form>
                </div>
                <div className={styles.modalFooter}>
                    <button type={"button"} className={'button-primary-outline'} onClick={props.closeModal}>Cancel
                    </button>
                    <button type={"button"} className={'button-primary'} onClick={handle}>Continue</button>
                </div>
                <div className={styles.error}>{error}</div>
            </div>
        </div>
    )
}

export default Modal