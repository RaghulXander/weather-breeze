import { useJsApiLoader } from "@react-google-maps/api";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "../templates/Header/Header";
import HeroImage from "icons/hero.png";
// atoms
import { Loader } from "../atoms/Loader/Loader";
import { ToastContainer } from "react-toastify";
import styles from "./Dashboard/Dashboard.module.scss";

// Lazy load application chunks
const DashboardView = React.lazy(async () => import("./Dashboard/Dashboard"));

const Root: React.FC = () => {
	console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? ""
	});

	if (!isLoaded) return <Loader />;

	return (
		<div
			className={styles.dashboardWrapper}
			style={{
				backgroundImage: `url(${HeroImage})`
			}}
		>
			<div className={styles.overlay} />
			<Suspense fallback={<Loader />}>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<DashboardView />} />
					</Routes>
				</main>
				<ToastContainer
					position="top-right"
					autoClose={2000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					pauseOnHover
				/>
			</Suspense>
		</div>
	);
};

export default Root;
