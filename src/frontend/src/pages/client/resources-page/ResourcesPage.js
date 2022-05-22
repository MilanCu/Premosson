import styles from './ResourcesPage.module.scss'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Sources} from "./sources/Sources";
import {Employees} from "./employees/Employees";
import {Places} from "./places/Places";

export const ResourcesPage = () => {
	const [active, setActive] = useState(0);

	useEffect(() => {
		localStorage.getItem("resources").includes("places") ? setActive(3) : localStorage.getItem("resources").includes("employees") ? setActive(2) : setActive(1)
	},[])

	return (
		<div className={styles.container}>
			<nav className={styles.nav}>
				<Link to={''} onClick={() => {
					setActive(1)
				}} className={active === 1 ? styles.active : ""}>Sources</Link>
				<Link to={''} onClick={() => {
					setActive(2)
				}} className={active === 2 ? styles.active : ""}>Employees</Link>
				<Link to={''} onClick={() => {
					setActive(3)
				}} className={active === 3 ? styles.active : ""}>Places</Link>
			</nav>
			<div className={styles.content}>
				{active === 1 ? <Sources/> : <></>}
				{active === 2 ? <Employees/> : <></>}
				{active === 3 ? <Places/> : <></>}
			</div>
		</div>
	)
}