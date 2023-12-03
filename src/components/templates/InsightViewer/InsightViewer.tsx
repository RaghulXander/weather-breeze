import React from "react";
import { WeatherResponse } from "store/models/weather.model";
import styles from "./InsightViewer.module.scss";

interface WeatherComponentProps {
	data: WeatherResponse;
}

export const InsightViewer: React.FC<WeatherComponentProps> = ({ data }) => {
	const formatDate = (timestamp: string): string => {
		const date = new Date(timestamp);
		return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
	};

	if (!data) return null;
	return (
		<div className={styles.weather}>
			<div className={styles.date}>{formatDate(data.dt_txt)}</div>
			<div className={styles.temperature}>
				<img
					className={styles.weatherIcon}
					src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
					alt={data.weather[0].description}
				/>
				<span>{Math.round(data.main.temp)}°C</span>
			</div>
			<div className={styles.description}>{data.weather[0].description}</div>
			<div className={styles.details}>
				<div>Feels like: {Math.round(data.main.feels_like)}°C</div>
				<div>Min Temperature: {Math.round(data.main.temp_min)}°C</div>
				<div>Max Temperature: {Math.round(data.main.temp_max)}°C</div>
				<div>Pressure: {data.main.pressure} hPa</div>
				<div>Sea Level: {data.main.sea_level} hPa</div>
				<div>Ground Level: {data.main.grnd_level} hPa</div>
				<div>Humidity: {data.main.humidity}%</div>
				<div>Wind: {data.wind.speed} m/s</div>
			</div>
		</div>
	);
};

export default InsightViewer;
