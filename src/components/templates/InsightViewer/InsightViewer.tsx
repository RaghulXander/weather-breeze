import { Location, WiThermometer, WiTime3 } from "icons/Icons";
import React, { useCallback } from "react";

import { WeatherResponse } from "store/models/weather.model";
import { getTemperature } from "utils/helper";
import styles from "./InsightViewer.module.scss";
import { useWeatherStore } from "store/weather";

interface WeatherComponentProps {
	data: WeatherResponse;
}

export const InsightViewer: React.FC<WeatherComponentProps> = ({ data }) => {
	const [
		{
			state: { weather: currentWeather },
			selectedLocation,
			selectedMetric
		}
	] = useWeatherStore();
	//const formatDate = (timestamp: string): string => {
	//	const date = new Date(timestamp);
	//	return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
	//};
	const formatDate = useCallback((date: string) => {
		const options: Intl.DateTimeFormatOptions = {
			day: "2-digit",
			weekday: "short",
			month: "short"
		};

		const formattedDate = new Date(date).toLocaleDateString("en-US", options);
		return formattedDate;
	}, []);

	if (!data || !currentWeather) return null;
	return (
		<div className={styles.weather}>
			<div className={styles.header}>
				<div className={styles.date}>
					<WiTime3 size={32} color="#fff" />
					{formatDate(data.dt_txt)}
				</div>
				<div className={styles.location}>
					<Location size={24} />
					{currentWeather.name ? `${currentWeather.name}, ${currentWeather.sys.country}` : selectedLocation}
				</div>
			</div>
			<div className={styles.temperature}>
				<div className={styles.value}>
					<img
						className={styles.weatherIcon}
						src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
						alt={data.weather[0].description}
					/>
					<div className={styles.description}>{data.weather[0].description}</div>
				</div>

				<div className={styles.value}>
					<WiThermometer size={48} color="#fff" />
					{getTemperature(data.main.temp, selectedMetric)}
					<sup>°</sup>
				</div>
			</div>
			<ul className={styles.details}>
				<li>
					<strong>Feels like:</strong> {getTemperature(Math.round(data.main.feels_like), selectedMetric)}°
				</li>
				<li>
					<strong>Min Temperature:</strong> {getTemperature(Math.round(data.main.temp_min), selectedMetric)}°
				</li>
				<li>
					<strong>Max Temperature:</strong> {getTemperature(Math.round(data.main.temp_max), selectedMetric)}°
				</li>
				<li>
					<strong>Pressure:</strong> {Math.round(data.main.temp_min)}hPa
				</li>
				<li>
					<strong>Sea Level:</strong> {Math.round(data.main.sea_level)}hPa
				</li>
				<li>
					<strong>Ground Level:</strong> {Math.round(data.main.grnd_level)}°C
				</li>
				<li>
					<strong>Wind:</strong> {Math.round(data.main.speed)} m/s
				</li>
				<li>
					<strong>Humidity:</strong> {Math.round(data.main.humidity)}%
				</li>
			</ul>
		</div>
	);
};

export default InsightViewer;
