import styles from './DashboardPage.module.scss'
import handShake from '@assets/svg/handshake.svg'
import menu from '@assets/svg/menu.svg'
import customerWidget from '@assets/svg/customerWidget.svg'
import dashboard from '@assets/svg/dashboardAlt.svg'
import employeeWidget from '@assets/svg/employeeWidget.svg'
import placeWidget from '@assets/svg/placeWidget.svg'
import terminWidget from '@assets/svg/terminWidget.svg'
import loadAudio from './../../../assets/sounds/load.mp3'
import ReactAudioPlayer from 'react-audio-player';
import axios from "axios";

import {useEffect, useState} from "react";
import AuthService from "../../../services/auth.service";
import {Link} from "react-router-dom";
import {ChartReservation} from "./ChartReservation";
import {baseUrl} from "../../../config/const";
import authHeader from "../../../services/auth-header";
import {Map} from "./Map";

export const DashboardPageClient = () => {

    const [isActiveShake, setIsLogoShake] = useState(false);

    const [reservations, setReservations] = useState();
    const [customers, setCustomers] = useState();

    const [todayReservation, setTodayReservation] = useState(undefined);
    const [allEvents, setAllEvents] = useState(undefined);
    const [resources, setResources] = useState(undefined);

    const [feedbacks, setFeedbacks] = useState(undefined);


    const user = AuthService.getCurrentUser();

    const animateLogo = () => {
        if (!isActiveShake) {
            setIsLogoShake(true);
            setTimeout(() => {
                setIsLogoShake(false)
            }, 1500);
        }
    }


    useEffect(() => {

        setIsLogoShake(true);
        setTimeout(() => {
            setIsLogoShake(false)
        }, 1500);

        const fetchFeedbacks = async () => {
            return await Promise.any([
                    axios.get(
                        `${baseUrl}/systems/my/feedback`,
                        {headers: authHeader()}
                    )
                ]
            )
        }
        fetchFeedbacks().then(r => setFeedbacks(r.data))


        const fetchCustomers = async () => {
            return await Promise.any([
                    axios.get(`${baseUrl}/systems/my/customers`,
                        {headers: authHeader()})
                ]
            )
        }

        fetchCustomers().then(r => setCustomers(r.data.length))

        const fetchSources = async () => {
            return await Promise.any([
                    axios.get(
                        `${baseUrl}/systems/my/sources`,
                        {headers: authHeader()})
                ]
            )
        }
        fetchSources().then(r => setResources(r.data.length))

        const fetchReservations = async () => {
            return await Promise.any(
                [
                    axios.get(
                        `${baseUrl}/systems/reservations`,
                        {headers: authHeader()}
                    )
                ]
            )
        }
        fetchReservations().then(r => setReservations(r.data.length))

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

        const fetchToday = async () => {
            return await Promise.any(
                [
                    axios.get(
                        `${baseUrl}/systems/reservations/today`,
                        {
                            headers: authHeader(),
                            params: {"fromDate": today()}
                        }
                    )
                ]
            )
        }
        fetchToday().then(r => setTodayReservation(r.data.length))

        const fetchEvents = async () => {
            return await Promise.any([
                axios.get(`${baseUrl}/systems/my/all/events`,
                    {headers: authHeader()}
                )
            ])
        }
        fetchEvents().then(r => {
            setAllEvents(r.data.length)
            // setAllEvents(undefined)
        })

    }, [])

    if (todayReservation === undefined || allEvents === undefined || feedbacks === undefined || customers === undefined || resources === undefined || reservations === undefined) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    <svg width="528" height="280" viewBox="0 0 528 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M48.125 61.4375C48.125 67.5208 45.1458 70.5625 39.1875 70.5625H15.5V106H0.875V8.1875H39.1875C45.1458 8.1875 48.125 11.1875 48.125 17.1875V61.4375ZM33.375 58V20.75H15.5V58H33.375Z"
                            fill="white"/>
                        <path
                            d="M108.562 106H93.3125L77.1875 60.5625C77.1875 60.5625 77.1875 57.625 77.1875 51.75H91.5625V20.75H73.125V106H58.5V8.1875H97.3125C103.188 8.1875 106.125 11.1875 106.125 17.1875V52.75C106.125 56.875 104.729 59.5417 101.938 60.75C100.438 61.375 97.2708 61.6875 92.4375 61.6875L108.562 106Z"
                            fill="white"/>
                        <path
                            d="M158.062 106H117.5V8.1875H157.688V21.125H132.125V49.6875H154.125V62.375H132.125V93.0625H158.062V106Z"
                            fill="white"/>
                        <path
                            d="M227.25 106H213.188V57.75C213.188 55.2083 213.479 51.6667 214.062 47.125L201.438 97.0625H194L181.312 47.125C181.896 51.75 182.188 55.2917 182.188 57.75V106H168.125V8.1875H181.938L197.312 62.25C197.479 62.8333 197.604 64.3125 197.688 66.6875C197.688 65.6458 197.812 64.1667 198.062 62.25L213.438 8.1875H227.25V106Z"
                            fill="white"/>
                        <path
                            d="M288.312 97.0625C288.312 103.021 285.354 106 279.438 106H247.688C241.896 106 239 103.021 239 97.0625V17.1875C239 11.1875 241.896 8.1875 247.688 8.1875H279.438C285.354 8.1875 288.312 11.1875 288.312 17.1875V97.0625ZM273.688 93.4375V20.75H253.625V93.4375H273.688Z"
                            fill="white"/>
                        <path
                            className={styles.logoUp}
                            d="M346.75 96.125C346.75 99.7917 345.625 102.312 343.375 103.688C341.75 104.688 339.167 105.188 335.625 105.188C335.042 105.188 334.125 105.167 332.875 105.125C331.625 105.125 330.688 105.125 330.062 105.125V113.812H316.375V105.125C315.75 105.125 314.812 105.125 313.562 105.125C312.354 105.167 311.438 105.188 310.812 105.188C307.312 105.188 304.75 104.688 303.125 103.688C300.958 102.354 299.875 99.8333 299.875 96.125V73.75H314.5V93.3125H332.125V74.25L303.062 46.75C300.938 44.7083 299.875 42.0625 299.875 38.8125V18.0625C299.875 14.3958 300.958 11.875 303.125 10.5C304.75 9.5 307.312 9 310.812 9C311.438 9 312.354 9.02083 313.562 9.0625C314.812 9.10417 315.75 9.125 316.375 9.125V0.375H330.062V9.125C330.688 9.125 331.625 9.10417 332.875 9.0625C334.167 9.02083 335.125 9 335.75 9C339.25 9 341.812 9.5 343.438 10.5C345.646 11.8333 346.75 14.3125 346.75 17.9375V39.0625H332.125V21.125H314.5V38.3125L343.375 65.5625C345.625 67.6458 346.75 70.2917 346.75 73.5V96.125Z"
                            fill="white"/>
                        <path
                            className={styles.logoDown}
                            d="M405.25 96.125C405.25 99.7917 404.125 102.312 401.875 103.688C400.25 104.688 397.667 105.188 394.125 105.188C393.542 105.188 392.625 105.167 391.375 105.125C390.125 105.125 389.188 105.125 388.562 105.125V113.812H374.875V105.125C374.25 105.125 373.312 105.125 372.062 105.125C370.854 105.167 369.938 105.188 369.312 105.188C365.812 105.188 363.25 104.688 361.625 103.688C359.458 102.354 358.375 99.8333 358.375 96.125V73.75H373V93.3125H390.625V74.25L361.562 46.75C359.438 44.7083 358.375 42.0625 358.375 38.8125V18.0625C358.375 14.3958 359.458 11.875 361.625 10.5C363.25 9.5 365.812 9 369.312 9C369.938 9 370.854 9.02083 372.062 9.0625C373.312 9.10417 374.25 9.125 374.875 9.125V0.375H388.562V9.125C389.188 9.125 390.125 9.10417 391.375 9.0625C392.667 9.02083 393.625 9 394.25 9C397.75 9 400.312 9.5 401.938 10.5C404.146 11.8333 405.25 14.3125 405.25 17.9375V39.0625H390.625V21.125H373V38.3125L401.875 65.5625C404.125 67.6458 405.25 70.2917 405.25 73.5V96.125Z"
                            fill="white"/>
                        <path
                            d="M466.438 97.0625C466.438 103.021 463.479 106 457.562 106H425.812C420.021 106 417.125 103.021 417.125 97.0625V17.1875C417.125 11.1875 420.021 8.1875 425.812 8.1875H457.562C463.479 8.1875 466.438 11.1875 466.438 17.1875V97.0625ZM451.812 93.4375V20.75H431.75V93.4375H451.812Z"
                            fill="white"/>
                        <path
                            d="M527.812 106H515L491.562 44.4375C492.188 47.4375 492.5 49.7917 492.5 51.5V106H478.25V8.1875H491.062L514.5 68.5C513.875 65.5 513.562 63.1458 513.562 61.4375V8.1875H527.812V106Z"
                            fill="white"/>
                    </svg>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <audio autoPlay src={loadAudio}/>
                <div className={styles.header} onMouseOver={animateLogo}>
                    <p className={styles.topic}>Hi, {user.username} </p>
                    <img className={isActiveShake ? styles.animate : ""} src={handShake} alt={'icon'}/>
                </div>

                <div className={styles.body}>
                    <div className={styles.leftSide}>
                        <div className={styles.top}>
                            <Link to={'/app/reservations'} className={
                                styles.cards
                            }>
                                <p className={styles.cardTopic}>
                                    Today's reservation
                                </p>
                                <div className={styles.summary}>
                                    <img src={menu} alt={'icon'}/>
                                    <span>{todayReservation}</span>
                                </div>
                            </Link>

                            <Link to={'/app/reservations'} className={
                                styles.cards
                            }>
                                <p className={styles.cardTopic}>
                                    All reservations
                                </p>
                                <div className={styles.summary}>
                                    <img src={dashboard} alt={'icon'}/>
                                    <span>{reservations}</span>
                                </div>
                            </Link>

                            <Link to={'/app/events'} className={
                                styles.cards
                            }>
                                <p className={styles.cardTopic}>
                                    Events
                                </p>
                                <div className={styles.summary}>
                                    <img src={terminWidget} alt={'icon'}/>
                                    <span>{allEvents}</span>
                                </div>
                            </Link>

                            <Link to={'/app/customers'} className={
                                styles.cards
                            }>
                                <p className={styles.cardTopic}>
                                    Customers
                                </p>
                                <div className={styles.summary}>
                                    <img src={customerWidget} alt={'icon'}/>
                                    <span>{customers}</span>
                                </div>
                            </Link>

                            <Link to={'/app/resources'} className={
                                styles.cards
                            }
                                  onClick={() => localStorage.setItem('resources', 'employees')
                                  }
                            >
                                <p className={styles.cardTopic}>
                                    Employees
                                </p>
                                <div className={styles.summary}>
                                    <img src={employeeWidget} alt={'icon'}/>
                                    <span>3</span>
                                </div>
                            </Link>

                            <Link to={'/app/resources'} onClick={() => localStorage.setItem('resources', 'places')}
                                  className={
                                      styles.cards
                                  }>
                                <p className={styles.cardTopic}>
                                    Places
                                </p>
                                <div className={styles.summary}>
                                    <img src={placeWidget} alt={'icon'}/>
                                    <span>{resources}</span>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.bottom}>
                            <ChartReservation/>
                        </div>
                    </div>
                    <div className={styles.rightSide}>
                        <div className={styles.contentTop}>
                            <h2>Feedbacks</h2>
                            <ul>
                                {feedbacks.map((f) => {
                                    return (
                                        <li>{f.message}<br/></li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className={styles.contentBottom}>
                            <Map/>
                        </div>
                    </div>
                </div>
        </div>
)
}