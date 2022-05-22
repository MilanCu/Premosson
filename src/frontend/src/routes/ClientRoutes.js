import {Route, Routes} from "react-router-dom";
import React from 'react';
import {
	CustomerPage,
	DashboardPage,
	EventsPage,
	ReservationsPage,
	ResourcesPage, SettingsPage
} from "../pages";
import {SidebarClient} from "../parts";


export const ClientRoutes = () => {
	return (
		<React.Fragment>
			<SidebarClient/>
			<Routes>
				<Route path="/dashboard" element={<DashboardPage/>}/>
				<Route path="/customers" element={<CustomerPage/>}/>
				<Route path="/resources" element={<ResourcesPage/>}/>
				<Route path="/reservations" element={<ReservationsPage/>}/>
				<Route path="/events" element={<EventsPage/>}/>
				<Route path="/settings" element={<SettingsPage/>}/>
			</Routes>
		</React.Fragment>
	)
}