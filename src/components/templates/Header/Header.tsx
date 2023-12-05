import { Hamburger, Locate, WeatherLogo } from "icons/Icons";
import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { SearchAutoComplete } from "components/atoms";
import Switch from "react-switch";
import styles from "./Header.module.scss";
import { toast } from "react-toastify";
import { useForecastStore } from "store/forecast";
import { useGeolocation } from "hooks/useGeoLocation";
import { useWeatherStore } from "store/weather";

export const Header: React.FC = () => {
	const [{ selectedMetric, currentWeather }, weatherActions] = useWeatherStore();
	const [locationReFetch, setInitLocationFetch] = useState(true);
	const [, forecastActions] = useForecastStore();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [toggled, setToggled] = useState(selectedMetric === "Fahrenheit");
	const { locateMe } = useGeolocation();

	useEffect(() => {
		const fetchData = async () => {
			const [latitude, longitude, notChanged] = await locateMe();
			if (notChanged && currentWeather?.latitude === latitude && currentWeather?.longitude === longitude) {
				toast.warn("Looks like the location haven't changed");
				return;
			}
			if (latitude && longitude && locationReFetch) {
				weatherActions.getWeather({ latitude, longitude });
				forecastActions.getForecast({ latitude, longitude });
			}
		};

		console.log("locationReFetch", locationReFetch);
		if (locationReFetch) {
			fetchData();
			setInitLocationFetch(false);
		}
	}, [locateMe, locationReFetch, weatherActions, forecastActions]);

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
						<button
							className={styles.locateMe}
							onClick={() => {
								setInitLocationFetch(true);
							}}
						>
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
							onChange={(checked: any) => {
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
