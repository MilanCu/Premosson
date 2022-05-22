import React, {useEffect, useState} from 'react';
import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ClientRoutes} from "./routes/ClientRoutes";
// import {CustomerRoutes} from "./routes/CustomerRoutes";
import {LoginPage, RegistrationPage, IndexPage} from "./pages";
import AuthService from "./services/auth.service";


function App() {
    const [regularUser, setRegularUser] = useState(false);
    const [systemOwner, setSystemOwner] = useState(false);
    const [systemEmployee, setSystemEmployee] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setRegularUser(user.roles.includes("ROLE_REGULAR_USER"));
            setSystemOwner(user.roles.includes("ROLE_SYSTEM_OWNER"));
            setSystemEmployee(user.roles.includes("ROLE_SYSTEM_EMPLOYEE"));
        }
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/" element={<IndexPage user={currentUser}/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>

                {/*{regularUser && (*/}
                {/*    <Route path="/app/*" element={<CustomerRoutes/>}/>*/}
                {/*)}*/}

                {systemOwner && (
                    <Route path="/app/*" element={<ClientRoutes/>}/>
                )}

                {systemEmployee && (
                    <Route path="/app/*" element={<ClientRoutes/>}/>
                )}
            </Routes>
        </div>
    );
}

export default App;
