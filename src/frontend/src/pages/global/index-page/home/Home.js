import styles from './Home.module.scss'
import {Link} from "react-router-dom";
import {useEffect} from "react";
import screen2 from '@assets/screens/Screenshot_1.png'
import screen1 from '@assets/screens/Screenshot_3.png'

export const Home = () => {

	useEffect(() => {
		document.getElementById('home').addEventListener('mousemove', e => {
			document.querySelectorAll("#home > img").forEach(move => {
				const moving_speed = move.getAttribute("data-speed");
				const x = (e.clientX * moving_speed) / 200;
				const y = (e.clientY * moving_speed) / 200;
				move.style.transform = `translateX(${x}px) translateY(${y}px)`;
			})
		})
	})


	return (
		<div id={'home'} className={styles.home}>
			<div className={styles.appDescription}>
				<h1>Enter the new era <br/>of reservations</h1>
				<p>Don’t be a .</p>
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
					the industry's standard dummy text ever since the 1500s, when an.</p>
				<div>
					<Link to={'/registration'}>
						<button type={"button"} className={'button-primary lg bx-sh'}>Try now!</button>
					</Link>
					<Link to={'/login'}>
						<button type={"button"} className={'button-primary-outline lg bx-sh'}>Login</button>
					</Link>
				</div>
			</div>
			<img src={screen1} alt={'db'} data-speed={'-2'}/>
			<img src={screen2} alt={'db'} data-speed={'2'}/>
		</div>
	)
}