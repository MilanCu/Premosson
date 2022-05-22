import styles from './NavbarIndex.module.scss'
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../../../services/auth.service";
import logo from "@assets/logo/logo_white.png";

export const NavbarIndex = (props) => {

    const logout = () => {
        AuthService.logout();
        window.location.reload()
    }

    return (
        <nav className={styles.topNav}>
            <img src={logo} alt={'logo'}/>
            <span className={styles.linksContainer}>
                <a href={'#home'}>Home</a>
                <a href={'#about'}>About</a>
                <a href={'#pricing'}>Pricing</a>
                <a href={'#contact'}>Contact</a>
            </span>
            <span className={styles.buttonsContainer}>
                {props.user ? (
                        <>
                            <Link to={'/app/dashboard'}>
                                <button type={"button"} className={'button-primary'}>
                                    App
                                </button>
                            </Link>
                            <button type={"button"} className={'button-primary-outline'} onClick={() => logout()}>
                                Logout
                            </button>
                        </>
                    )
                    :
                    <>
                        <Link to={'/login'}>
                            <button type={"button"} className={'button-primary-outline'}>
                                Login
                            </button>
                        </Link>
                        <Link to={'/register'}>
                            <button type={"button"} className={'button-primary'}>
                                Register
                            </button>
                        </Link>
                    </>
                }
            </span>
        </nav>
    );
}