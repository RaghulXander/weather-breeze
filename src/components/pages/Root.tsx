import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Header } from "../templates/Header/Header";
import HeroImage from "icons/hero.png";
// atoms
import { Loader } from "../atoms/Loader/Loader";
import styles from "./Dashboard/Dashboard.module.scss";
import { useJsApiLoader } from "@react-google-maps/api";
import useSwipeableMessage from "hooks/useSwipeMessage";

// Lazy load application chunks
const DashboardView = lazy(async () => import("./Dashboard/Dashboard"));

const Root: React.FC = () => {
	const { showMessage } = useSwipeableMessage();

	const { isLoaded, loadError } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "",
		libraries: ["places"]
	});

	useEffect(() => {
		if (showMessage) {
			toast.info("Swipe to see next 5 days forecast 🎉");
		}
	}, [showMessage]);

	if (!isLoaded) return <Loader />;

	if (loadError) {
		return <div>Error loading maps</div>;
	}

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
