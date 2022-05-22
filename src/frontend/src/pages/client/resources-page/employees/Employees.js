import styles from './Employees.module.scss'
import {useState} from "react";
import {ModalEdit} from "./ModalEdit";
import {ModalDelete} from "./ModalDelete";
import {ModalCreate} from "./ModalCreate";

const data = [{
    username: "Anom",
    firstname: "Larhonda",
    lastname: "Koch",
    email: "Jong0@owner.com",
    id: ""
}, {username: "Megha", firstname: "Merilyn", lastname: "Beer", email: "Brady4@owner.com", id: ""}, {
    username: "Subham",
    firstname: "Darlene",
    lastname: "Volkman",
    email: "Larhonda5@owner.com",
    id: ""
},]

//NENI BE, NENI PRIPRAVENY :-), je to hardcoded

export const Employees = () => {

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showCreate, setShowCreate] = useState(false);

    const [employee, setEmployee] = useState({
        username: '', firstname: '', lastname: '', email: '', id: ''
    });
    const [id, setId] = useState('');

    return (<div className={styles.container}>
            <table className={styles.table}>
                <thead>
                <tr className={styles.trHeader}>
                    <th>Username</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {data.map((val) => {
                    return (<tr className={styles.line}>
                            <td>{val.username}</td>
                            <td>{val.firstname}</td>
                            <td>{val.lastname}</td>
                            <td>{val.email}</td>
                            <td>
                                <button type={'button'} className={'button-primary-outline sm'}
                                        onClick={() => {
                                            setShowEdit(true)
                                            setEmployee(val)
                                        }}
                                >Edit
                                </button>
                                <button type={'button'} className={'button-primary sm'}
                                        onClick={() => {
                                            setShowDelete(true)
                                            setId(val.id)
                                        }}
                                >Delete
                                </button>
                            </td>
                        </tr>)
                })}
                </tbody>

            </table>
            <div>
                <button className={'button-primary'} onClick={() => setShowCreate(true)}>Add employee</button>
            </div>
            <ModalEdit onClose={() => setShowEdit(false)} show={showEdit} data={employee}/>
            <ModalDelete onClose={() => setShowDelete(false)} show={showDelete} data={id}/>
            <ModalCreate onClose={() => setShowCreate(false)} show={showCreate}/>
        </div>)
}