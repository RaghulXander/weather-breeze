import {
	Location,
	WiCloudDown,
	WiCloudUp,
	WiDayWindy,
	WiHumidity,
	WiNightClear,
	WiStrongWind,
	WiThermometer,
	WiTime3
} from "icons/Icons";
import React, { useCallback, useMemo } from "react";

import { IconProps } from "icons";
import { WeatherResponse } from "../../../store/models/weather.model";
import { getTemperature } from "../../../utils/helper";
import { getWeatherIconByCode } from "utils/getIconByCode";
import styles from "./WeatherGrid.module.scss";
import { useWeatherStore } from "store/weather";

export const WeatherGrid: React.FC<{ weather: WeatherResponse }> = ({ weather }) => {
	const [
		{
			state: { weather: currentWeather },
			selectedLocation,
			selectedMetric
		}
	] = useWeatherStore();

	type Item = {
		id: string;
		name: string;
		accessor: string;
		icon: React.ComponentType<IconProps>;
	};

	const formatDate = useCallback((date: string) => {
		const options: Intl.DateTimeFormatOptions = {
			day: "2-digit",
			weekday: "short",
			month: "short"
		};

		const formattedDate = new Date(date).toLocaleDateString("en-US", options);
		return formattedDate;
	}, []);

	const getNestedValue = useCallback((obj: any, accessor: string) => {
		if (!accessor.includes(".")) return obj[accessor];
		return accessor
			.split(".")
			.reduce((acc: any, key: string) => (acc && acc[key] !== "undefined" ? acc[key] : undefined), obj);
	}, []);

	const infoItems = useMemo((): Item[] => {
		return [
			{
				id: "humidity",
				accessor: "main.humidity",
				name: "Humidity",
				icon: WiHumidity
			},
			{
				id: "visibility",
				accessor: "visibility",
				name: "Visibility",
				icon: WiNightClear
			},
			{
				id: "pressure",
				accessor: "main.pressure",
				name: "Pressure",
				icon: WiDayWindy
			},
			{
				id: "wind",
				accessor: "wind.speed",
				name: "Wind",
				icon: WiStrongWind
			}
		];
	}, []);

	if (!weather || !currentWeather) return null;
	const WeatherIcon = getWeatherIconByCode(weather.weather[0].id);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.date}>
					<WiTime3 size={32} color="#fff" />
					{formatDate(weather.dt_txt)}
				</div>
				<div className={styles.location}>
					<Location size={24} />
					{currentWeather.name ? `${currentWeather.name}, ${currentWeather.sys.country}` : selectedLocation}
				</div>
			</div>
			<div className={styles.mainContent}>
				<div className={styles.weatherInfo}>
					<div className={styles.weatherItem}>
						<div className={styles.block}>
							<WiThermometer size={48} color="#fff" />
							<div className={styles.temperature}>
								{getTemperature(weather.main.temp, selectedMetric)}
								<sup>°</sup>
							</div>
						</div>
						<div className={styles.secondaryInfo}>
							<div className={styles.feelLike}>
								Feels like {getTemperature(weather.main.feels_like, selectedMetric)}
								<sup>°</sup>
							</div>
						</div>
					</div>
					<div className={styles.weatherItem}>
						<div className={styles.block}>
							<WeatherIcon size={64} color="#fff" />
							<div className={styles.info}>{weather.weather[0].main}</div>
						</div>
						<div className={styles.secondaryInfo}>
							<div className={styles.highLow}>
								<span>
									<WiCloudUp size={40} color="#fff" />
									<div className={styles.highLowInfo}>
										{getTemperature(weather.main.temp_max, selectedMetric)}
										<sup>°</sup>
									</div>
								</span>
								<span>
									<WiCloudDown size={40} color="#fff" />
									<div className={styles.highLowInfo}>
										{getTemperature(weather.main.temp_min, selectedMetric)}
										<sup>°</sup>
									</div>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.infoContainer}>
				{infoItems.map((item) => {
					const Icon = item.icon;
					return (
						<div id={item.id} className={styles.item}>
							<span className={styles.value}>
								<Icon size={32} color="#fff" />
								{weather ? getNestedValue(weather, item.accessor) : "-"}
							</span>
							<span className={styles.name}>{item.name}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default WeatherGrid;
