import { Hamburger, Locate, WeatherLogo } from "icons/Icons";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { Location } from "store/models/weather.model";
import { SearchAutoComplete } from "components/atoms";
import Switch from "react-switch";
import styles from "./Header.module.scss";
import { useForecastStore } from "store/forecast";
import { useWeatherStore } from "store/weather";
import { useGeolocation } from "hooks/useGeoLocation";

export const Header: React.FC = () => {
	const [{ selectedMetric }, weatherActions] = useWeatherStore();
	const [, forecastActions] = useForecastStore();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [toggled, setToggled] = useState(selectedMetric === "Fahrenheit");
	const { latitude, longitude, onLocateMeClick } = useGeolocation();

	useEffect(() => {
		if (latitude && longitude) {
			weatherActions.getWeather({ latitude, longitude } as Location["coords"]);
			forecastActions.getForecast({ latitude, longitude } as Location["coords"]);
		}
	}, [latitude, longitude]);

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
