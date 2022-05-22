import styles from './SettingsPage.module.scss'
import {useEffect, useState} from "react";
import AuthService from "../../../services/auth.service";
import axios from "axios";
import {baseUrl} from "../../../config/const";
import authHeader from "../../../services/auth-header";

const FormUser = () => {
	const user = AuthService.getCurrentUser();

	const [username, setUsername] = useState(user.username);
	const [email, setEmail] = useState(user.email);
	const [oldPassword, setOldPassword] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');
	const [error, setError] = useState('');

	const handle = (e) => {
		if (username.trim().length === 0 || email.trim().length === 0 || oldPassword.trim().length === 0 || password.trim().length === 0 || rePassword.trim().length === 0) {
			setError('Please fill data')
			e.preventDefault();
		} else {
			if (password === rePassword) {
				axios.post(`${baseUrl}/users/signin`, {
					"username": user.username, "password": oldPassword
				}).then(r => {
					console.log(r)
					axios.post(`${baseUrl}/updateProfile`, {
						"username": username, "email": email, "password": password
					}, {
						headers: authHeader(), params: {
							"username": username, "email": email, "password": password
						}
					}).then(r => {
						axios.post(`${baseUrl}/users/signin`, {
							"username": user.username, "password": oldPassword
						}).then(r => {
							if (r.data.accessToken) {
								localStorage.setItem('user', JSON.stringify(r.data));
							}
							window.location.reload();
						})
					})
						.catch(e => {
							setError(e)
						})
				})
					.catch(e => {
						setError(e)
					})
			} else {
				setError("Passwords does not match")
			}
		}

	}

	return (
		<form className={styles.userForm}>
			<h2>Profile</h2>
			<label>
				Username
				<input
					type={'text'}
					className={'input-primary'}
					value={username}
					required={true}
					onChange={(e) => {
						setUsername(e.target.value)
					}}
				/>
			</label>
			<label>
				Email
				<input
					type={'email'}
					className={'input-primary'}
					required={true}
					value={email}
					onChange={(e) => {
						setEmail(e.target.value)
					}}
				/>
			</label>
			<label>
				Old Password
				<input
					type={'password'}
					className={'input-primary'}
					required={true}
					value={oldPassword}
					onChange={(e) => {
						setOldPassword(e.target.value)
					}}
				/>
			</label>
			<label>
				New Password
				<input
					type={'password'}
					className={'input-primary'}
					required={true}
					value={password}
					onChange={(e) => {
						setPassword(e.target.value)
					}}
				/>
			</label>
			<label>
				Repeat New Password
				<input
					type={'password'}
					className={'input-primary'}
					required={true}
					value={rePassword}
					onChange={(e) => {
						setRePassword(e.target.value)
					}}
				/>
			</label>
			<div className={styles.error}>
				{error}
			</div>
			<button type={'button'} onClick={(e) => {
				handle(e)
			}} className={'button-primary'}>Save
			</button>
		</form>
	)
}

const FormSystem = () => {

	const [system, setSystem] = useState('');

	useEffect(() => {
		axios.get(
			`${baseUrl}/systems/1`
		).then(r => {
				setSystem(r.data.name)
			}
		)
	}, [])

	return (
		<form>
			<h2>System</h2>
			<label>
				Name
				<input
					type={'text'}
					className={'input-primary'}
					value={system}
					required={true}
				/>
			</label>
			<button className={'button-primary'} type={'submit'}>Save</button>
		</form>
	)
}

export const SettingsPage = () => {

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p className={styles.topic}>Settings</p>
			</div>
			<div className={styles.content}>
				<FormUser/>
			</div>
		</div>
	)
}