import {Route, Routes} from "react-router-dom";
import React from 'react';
import {
	CustomerPageClient,
	DashboardPageClient,
	EventsPageClient,
	ReservationsPageClient,
	ResourcesPageClient, SettingsPageClient
} from "../pages";
import {SidebarClient} from "../parts";


export const ClientRoutes = () => {
	return (
		<React.Fragment>
			<SidebarClient/>
			<Routes>
				<Route path="/dashboard" element={<DashboardPageClient/>}/>
				<Route path="/customers" element={<CustomerPageClient/>}/>
				<Route path="/resources" element={<ResourcesPageClient/>}/>
				<Route path="/reservations" element={<ReservationsPageClient/>}/>
				<Route path="/events" element={<EventsPageClient/>}/>
				<Route path="/settings" element={<SettingsPageClient/>}/>
			</Routes>
		</React.Fragment>
	)
}