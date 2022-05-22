import styles from './EventsPage.module.scss'
import React, {useEffect, useState} from "react";
import {Event} from "./Event";
import {createRoot, render} from "react-dom/client";
import axios from "axios";
import {baseUrl} from "../../../config/const";
import authHeader from "../../../services/auth-header";
import Modal from "./Modal";


export const EventsPageClient = () => {

    const [open, setOpen] = useState(false)
    const [event, setEvent] = useState('')
    const [newEventShow, setNewEventShow] = useState(false);

    const TimeSlot = (props) => {
        return (
            <g>
                <rect
                    className={styles.event}
                    onClick={() => {
                        setOpen(true)
                        setEvent(props.data)
                    }}
                    x={props.x}
                    y={props.y}
                    rx={props.rx}
                    ry={props.ry}
                    width={props.width}
                    height={props.height}
                    fill={props.fill}
                >
                </rect>
            </g>
        )
    }

    // const data = [{start: "2022-04-29T12:00:00.000Z", end: "2022-04-29T17:00:00.000Z", event: "Football Indoor"}]

    const date = new Date();

    const time = new Date();

    const getDayString = (date) => {
        return (date.toDateString().replace("2022", ""))
    }

    useEffect(() => {

        const getEvents = async () => {
            for (let i = 0; i < 7; i++) {
                let next = new Date();
                next.setDate(new Date().getDate() + i);
                let x = await events(next);
                renderSlots(x.data, i)
            }
        }


        const events = async (date) => {
            return axios.get(`${baseUrl}/systems/my/events`, {
                headers: authHeader(),
                params: {
                    fromDate: date.toISOString().substring(0, 10),
                    toDate: date.toISOString().substring(0, 10)
                }
            })
        }


        const renderSlots = (r, i) => {
            let x = i + 1
            const day = document.querySelector(`[data-day="${x}"] > svg`);
            const root = createRoot(day);


            if (x === 1) {
                root.render(
                    <>
                        {r.map(re => {
                            return (
                                <TimeSlot
                                    x={'0'}
                                    y={String(new Date(`${re.startDate} ${re.fromTime}`).getHours() * 60)}
                                    rx={'10'}
                                    ry={'10'}
                                    width={'100%'}
                                    height={String((new Date(`${re.startDate} ${re.toTime}`).getHours() - new Date(`${re.startDate} ${re.fromTime}`).getHours()) * 60)}
                                    fill={'#69e3df'}
                                    data={re}
                                />
                            )
                        })}
                        <rect
                            x="0" y={time.getHours() * 60 + time.getMinutes()} rx="2" ry="2"
                            width="100%" height="5"
                            fill={'yellow'}/>
                    </>
                )
            } else {
                root.render(
                    <>
                        {r.map(re => {
                            return (
                                <TimeSlot
                                    x={'0'}
                                    y={String(new Date(`${re.startDate} ${re.fromTime}`).getHours() * 60)}
                                    rx={'10'}
                                    ry={'10'}
                                    width={'100%'}
                                    height={String((new Date(`${re.startDate} ${re.toTime}`).getHours() - new Date(`${re.startDate} ${re.fromTime}`).getHours()) * 60)}
                                    fill={'#a0d7d5'}
                                    data={re}
                                />
                            )
                        })}
                    </>
                )
            }

        }


        const scroll = () => {
            const scrollElem = document.querySelector('.' + styles.container);
            scrollElem.scroll({
                top: (time.getHours() * 60) - 120, behavior: 'smooth'
            });
        }

        getEvents()
        scroll()

    }, [])


    return (<div className={styles.mainContainer}>
        {open ? <Event data={event} onClose={() => {
            setOpen(false)
        }}/> : null}
        {newEventShow && <Modal closeModal={() => setNewEventShow(false)}/>}
        <div className={styles.header}>
            <p className={styles.topic}>Events</p>
        </div>
        <div className={styles.content}>
            <div>
                <button className={'button-primary-outline'} onClick={() => setNewEventShow(true)}>Add Event</button>
            </div>
            <div className={styles.back}>
                <div className={styles.container}>
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th className={'thDay1'}>{getDayString(date)}</th>
                            <th className={'thDay2'}>{getDayString(new Date(date.setDate(date.getDate() + 1)))}</th>
                            <th className={'thDay3'}>{getDayString(new Date(date.setDate(date.getDate() + 1)))}</th>
                            <th className={'thDay4'}>{getDayString(new Date(date.setDate(date.getDate() + 1)))}</th>
                            <th className={'thDay5'}>{getDayString(new Date(date.setDate(date.getDate() + 1)))}</th>
                            <th className={'thDay6'}>{getDayString(new Date(date.setDate(date.getDate() + 1)))}</th>
                            <th className={'thDay7'}>{getDayString(new Date(date.setDate(date.getDate() + 1)))}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className={styles.time}>
                                <div>0:00</div>
                                <div>1:00</div>
                                <div>2:00</div>
                                <div>3:00</div>
                                <div>4:00</div>
                                <div>5:00</div>
                                <div>6:00</div>
                                <div>7:00</div>
                                <div>8:00</div>
                                <div>9:00</div>
                                <div>10:00</div>
                                <div>11:00</div>
                                <div>12:00</div>
                                <div>13:00</div>
                                <div>14:00</div>
                                <div>15:00</div>
                                <div>16:00</div>
                                <div>17:00</div>
                                <div>18:00</div>
                                <div>19:00</div>
                                <div>20:00</div>
                                <div>21:00</div>
                                <div>22:00</div>
                                <div>23:00</div>
                            </td>
                            <td data-day={'1'}>
                                <svg width="90%" height="1446" xmlns="http://www.w3.org/2000/svg">
                                    {/*<rect className={styles.event}*/}
                                    {/*      x="0" y="5" rx="10" ry="10" width="48%" height="360"*/}
                                    {/*      fill={'#ff6565'}/>*/}
                                    {/*<rect className={styles.event}*/}
                                    {/*      x="52%" y="125" rx="10" ry="10" width="48%" height="480"*/}
                                    {/*      fill={'#ff8989'}/>*/}

                                </svg>
                            </td>
                            <td data-day={'2'}>
                                <svg width="90%" height="1446" xmlns="http://www.w3.org/2000/svg">
                                    {/*<rect className={styles.event}*/}
                                    {/*      x="0" y="900" rx="10" ry="10" width="100%" height="120"*/}
                                    {/*      fill={'#ffc14f'}/>*/}
                                    {/*<rect className={styles.event}*/}
                                    {/*      x="0" y="245" rx="10" ry="10" width="100%" height="480"*/}
                                    {/*      fill={'#fa8223'}/>*/}
                                </svg>
                            </td>
                            <td data-day={'3'}>
                                <svg width="90%" height="1446" xmlns="http://www.w3.org/2000/svg">
                                    {/*<rect className={styles.event}*/}
                                    {/*      x="0" y="485" rx="10" ry="10" width="100%" height="480"*/}
                                    {/*      fill={'#88ff67'}/>*/}
                                </svg>
                            </td>
                            <td data-day={'4'}>
                                <svg width="90%" height="1446" xmlns="http://www.w3.org/2000/svg">

                                </svg>
                            </td>
                            <td data-day={'5'}>
                                <svg width="90%" height="1446" xmlns="http://www.w3.org/2000/svg">

                                </svg>
                            </td>
                            <td data-day={'6'}>
                                <svg width="90%" height="1446" xmlns="http://www.w3.org/2000/svg">
                                    {/*<rect className={styles.event}*/}
                                    {/*      x="0" y="505" rx="10" ry="10" width="30%" height="120"*/}
                                    {/*      fill={'#70dac4'}/>*/}
                                    {/*<rect className={styles.event}*/}
                                    {/*      x="33%" y="460" rx="10" ry="10" width="30%" height="345"*/}
                                    {/*      fill={'#3affd6'}/>*/}
                                    {/*<rect className={styles.event}*/}
                                    {/*      x="66%" y="565" rx="10" ry="10" width="30%" height="120"*/}
                                    {/*      fill={'#3dddff'}/>*/}
                                </svg>
                            </td>
                            <td data-day={'7'}>
                                <svg width="90%" height="1446" xmlns="http://www.w3.org/2000/svg">
                                    {/*<rect className={styles.event}*/}
                                    {/*      x="0" y="5" rx="10" ry="10" width="100%" height="1400"*/}
                                    {/*      fill={'#d8ffb3'}/>*/}
                                </svg>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>)
}