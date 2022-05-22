import styles from './SidebarClient.module.scss'

import logo from '@assets/logo/logo_white.png'
import customer from '@assets/svg/customer.svg'
import dashboard from '@assets/svg/dashboard.svg'
import event from '@assets/svg/event.svg'
import reservation from '@assets/svg/reservation.svg'
import resources from '@assets/svg/resources.svg'
import setting from '@assets/svg/setting.svg'
import logoutI from '@assets/svg/logout.svg'
import info from '@assets/svg/info.svg'
import video from '@assets/videos/video.mp4'
import {Link, useLocation, useNavigate} from "react-router-dom";
import authService from "../../../services/auth.service";
import AuthService from "../../../services/auth.service";
import {useState} from "react";

export const SidebarClient = () => {

    const location = useLocation();
    const {pathname} = location;
    const splitLocation = pathname.split("app/");

    const [showVideo, setShowVideo] = useState(false);

    let navigate = useNavigate();
    const logout = () => {
        AuthService.logout();
        navigate('/');
        window.location.reload()
    }

    return (
        <aside className={styles.menu}>
            {showVideo ?
                <div className={styles.modal} onClick={() => setShowVideo(false)}>
                    <div className={styles.content} onClick={e => e.stopPropagation()}>
                        <video width="860" height="540" autoPlay muted>
                            <source src={video} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                : null}
            <div className={styles.top}>
                <img src={logo} alt={'logo'}/>
            </div>

            <div className={styles.body}>
                <div
                    className={splitLocation[1] === "dashboard" ? styles.link.concat(' ').concat(styles.active) : styles.link}>
                    <Link to={'dashboard'} className={styles.linkIcon}><img src={dashboard}
                                                                            alt={'icon'}/>Dashboard</Link>
                </div>

                <div
                    className={splitLocation[1] === "events" ? styles.link.concat(' ').concat(styles.active) : styles.link}>
                    <Link to={'events'} className={styles.linkIcon}><img src={event} alt={'icon'}/>Events</Link>
                </div>

                <div
                    className={splitLocation[1] === "reservations" ? styles.link.concat(' ').concat(styles.active) : styles.link}>
                    <Link to={'reservations'} className={styles.linkIcon}><img src={reservation} alt={'icon'}/>Reservations</Link>
                </div>

                <div
                    className={splitLocation[1] === "customers" ? styles.link.concat(' ').concat(styles.active) : styles.link}>
                    <Link to={'customers'} className={styles.linkIcon}><img src={customer}
                                                                            alt={'icon'}/>Customers</Link>
                </div>

                <div onClick={() => localStorage.setItem("resources", "x")}
                     className={splitLocation[1] === "resources" ? styles.link.concat(' ').concat(styles.active) : styles.link}>
                    <Link to={'resources'} className={styles.linkIcon}><img src={resources} alt={'icon'}/>Sources</Link>
                </div>

                <div
                    className={splitLocation[1] === "settings" ? styles.link.concat(' ').concat(styles.active) : styles.link}>
                    <Link to={'settings'} className={styles.linkIcon}><img src={setting} alt={'icon'}/>Settings</Link>
                </div>

                <div
                    className={styles.link}>
                    <div to={'settings'} onClick={() => setShowVideo(true)} className={styles.linkIcon}><img src={info}
                                                                                                             alt={'icon'}/>Help
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <button
                    type={'button'}
                    onClick={() => {
                        logout();
                    }}
                >
                    <img src={logoutI} alt={''}/>
                    Log out
                </button>
            </div>
        </aside>
    )
}