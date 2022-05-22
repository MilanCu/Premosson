import styles from './Sources.module.scss'
import {useEffect, useState} from "react";
import axios from "axios";
import {baseUrl} from "../../../../config/const";
import authHeader from "../../../../services/auth-header";

export const ModalCreate = (props) => {

    const [title, setTitle] = useState('')

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [option, setOption] = useState('custom');

    const [error, setError] = useState();

    const handle = () => {
        if (
            name.length === 0 ||
            description.length === 0
        ) {
            setError("Please fill data")
        } else {
            if (option === "custom") {
                axios.post(
                    `${baseUrl}/systems/my/sources`,
                    {
                        "name": name,
                        "description": description,
                        "address": {
                            city: city,
                            street: street,
                            houseNumber: houseNum,
                            postalCode: postCode
                        }
                    },
                    {
                        headers: authHeader(),
                        params: {
                            "name": name,
                            "description": description
                        }
                    }
                ).then((r) => {
                    props.onClose()
                    window.location.reload()
                })
            } else {
                let address = JSON.parse(option);
                console.log(address)
                axios.post(
                    `${baseUrl}/systems/my/sources`,
                    {
                        "name": name,
                        "description": description,
                        "address": {
                            city: address.city,
                            street: address.street,
                            houseNumber: address.houseNumber,
                            postalCode: address.postalCode
                        }
                    },
                    {
                        headers: authHeader(),
                        params: {
                            "name": name,
                            "description": description
                        }
                    }
                ).then((r) => {
                    props.onClose()
                    window.location.reload()
                })
            }

        }
    }

    const [address, setAddress] = useState([]);

    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNum, setHouseNum] = useState('');
    const [postCode, setPostCode] = useState('');

    useEffect(() => {
        const fetchAddress = async () => {
            return await Promise.any([
                    axios.get(
                        `${baseUrl}/systems/my/sources`,
                        {headers: authHeader()})
                ]
            )
        }
        fetchAddress().then(r => setAddress(r.data))
    }, [])

    if (!props.show) return null;

    return (
        <div className={styles.modalContainer} onClick={props.onClose}>
            <div className={styles.content} onClick={e => e.stopPropagation()}>
                <form>
                    <label>
                        Name
                        <input
                            className={'input-primary'}
                            type={'text'}
                            value={name}
                            required={true}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        Description
                        <input
                            className={'input-primary'}
                            type={'text'}
                            value={description}
                            required={true}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label>
                        Place
                        <select required={true} className={'input-primary'} onChange={(e) => setOption(e.target.value)}>
                            <option value={'custom'}>Custom</option>
                            {address.map(address => {
                                return (
                                    <option value={JSON.stringify(address.address)}>
                                        {address.address.city + " "}
                                        {address.address.street + " "}
                                        {address.address.houseNumber + " "}
                                    </option>
                                )
                            })}
                        </select>
                    </label>
                    {option === "custom" ? <div><label>
                        City
                        <input
                            className={'input-primary'}
                            type={'text'}
                            required={true}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                        <label>
                            Street
                            <input
                                className={'input-primary'}
                                type={'text'}
                                required={true}
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                        </label>
                        <label>
                            House Number
                            <input
                                className={'input-primary'}
                                type={'text'}
                                required={true}
                                value={houseNum}
                                onChange={(e) => setHouseNum(e.target.value)}
                            />
                        </label>
                        <label>
                            Post Code
                            <input
                                className={'input-primary'}
                                type={'text'}
                                required={true}
                                value={postCode}
                                onChange={(e) => setPostCode(e.target.value)}
                            />
                        </label></div> : null}

                    <button className={'button-primary'} type={'button'} onClick={handle}>Uložit</button>
                    <div className={styles.error}>{error}</div>
                </form>
            </div>
        </div>
    )
}