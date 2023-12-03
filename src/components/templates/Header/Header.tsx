import { Hamburger, Locate, WeatherLogo } from "icons/Icons";
import { NavLink, useLocation } from "react-router-dom";
import React, { useCallback } from "react";

import { Location } from "store/models/weather.model";
import { SearchAutoComplete } from "components/atoms";
import Switch from "react-switch";
import styles from "./Header.module.scss";
import { toast } from "react-toastify";
import { useForecastStore } from "store/forecast";
import { useWeatherStore } from "store/weather";

const ERROR_CODES = {
	PERMISSION_DENIED: 1,
	POSITION_UNAVAILABLE: 2,
	TIMEOUT: 3
};

export const Header: React.FC = () => {
	const [{ selectedMetric }, weatherActions] = useWeatherStore();
	const [, forecastActions] = useForecastStore();
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [toggled, setToggled] = React.useState(selectedMetric === "Fahrenheit");
	const [latitude, setLatitude] = React.useState(0);
	const [longitude, setLongitude] = React.useState(0);

	const onSucess = (response: Location) => {
		console.log("response", response);

		if (latitude !== response.coords.latitude || longitude !== response.coords.longitude) {
			weatherActions.getWeather(response.coords);
			forecastActions.getForecast(response.coords);
			setLatitude(response.coords.latitude);
			setLongitude(response.coords.longitude);
		}
	};

	const retryPermission = useCallback(() => {
		navigator.geolocation.getCurrentPosition(onSucess, () => {
			toast.error("An error occurred while retrieving location.");
		});
	}, []);

	const onError = (error: GeolocationPositionError) => {
		console.error(error);
		switch (error.code) {
			case ERROR_CODES.PERMISSION_DENIED:
				toast.error("Please allow location access and try again by clicking close", {
					autoClose: false,
					onClose: () => {
						navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
							if (permissionStatus.state !== "denied") retryPermission();
						});
					}
				});
				break;
			case ERROR_CODES.POSITION_UNAVAILABLE:
			case ERROR_CODES.TIMEOUT:
			default:
				toast.error(error.message);
				console.error(error.message);
				break;
		}
	};

	const onLocateMeClick = useCallback(
		() => navigator.geolocation.getCurrentPosition(onSucess, onError),
		[retryPermission]
	);

	return (
		<header className={styles.containerWrapper}>
			<nav className={styles.container}>
				<div className={styles.logo}>
					<NavLink to="/">
						<WeatherLogo size={48} />
						<div>JR • SkyLite</div>
					</NavLink>
				</div>
				<div className={styles.menuToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
					<div className={`${styles.toggleIcon} ${isMenuOpen ? styles.open : ""}`}>
						<Hamburger size={32} color="#fff" />
					</div>
				</div>
				<div className={`${styles.menuContent} ${isMenuOpen ? styles.open : ""}`}>
					<div className={styles.searchContainer}>
						<SearchAutoComplete />
					</div>
					<div className={styles.controlActions}>
						<button className={styles.locateMe} onClick={onLocateMeClick}>
							<Locate size={24} color="#fff" />
							<span>Locate me</span>
						</button>
						<Switch
							onColor={"#AD36CB"}
							offColor={"#797979"}
							className={styles.toggleSwitch}
							checkedIcon={
								<span className={styles.toggleValue}>
									F<sup>°</sup>
								</span>
							}
							uncheckedIcon={
								<span className={styles.toggleValue}>
									C <sup>°</sup>
								</span>
							}
							onChange={(checked) => {
								setToggled(checked);
								weatherActions.setMetricType(checked ? "Fahrenheit" : "Celsius");
							}}
							checked={toggled}
							height={24}
							borderRadius={12}
						/>
					</div>
				</div>
			</nav>
		</header>
	);
};
