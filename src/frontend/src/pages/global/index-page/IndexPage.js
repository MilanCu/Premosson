import styles from './IndexPage.module.scss'
import {NavbarIndex} from "../../../parts";
import {Home} from "./home/Home";
import {About} from "./about/About";
import {Pricing} from "./pricing/Pricing";
import {Contact} from "./contact/Contact";
import React from 'react';

export const IndexPage = (props) => {
    return (
        <React.Fragment>
            <NavbarIndex user={props.user}/>
            <div className={styles.container}>
                <Home/>
                <About/>
                <Pricing/>
                <Contact/>
            </div>
        </React.Fragment>

    )
}