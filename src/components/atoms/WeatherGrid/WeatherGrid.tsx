import React, { useMemo } from "react";
import styles from "./WeatherGrid.module.scss";
import {
	WiCloudDown,
	WiCloudUp,
	WiDayWindy,
	WiHumidity,
	WiNightClear,
	WiStrongWind,
	WiThermometer,
	WiTime12,
	WiTime3
} from "icons/Icons";
import { useWeatherStore } from "store/weather";
import SvgWiThermometer from "icons/Icons/weather/WiThermometer";
import SvgLocation from "icons/Icons/Location";
import getWeatherIconByCode from "utils/getIconByCode";
import { WeatherResponse } from "../../../store/models/weather.model";
import { IconProps } from "icons";

export const CurrentWeather: React.FC<{ weather: WeatherResponse }> = ({ weather }) => {
	const [
		{
			state: { weather: currentWeather }
		}
	] = useWeatherStore();

	type Item = {
		id: string;
		name: string;
		accessor: string;
		icon: React.ComponentType<IconProps>;
	};

	function formatDate(date: string) {
		const options = {
			day: "2-digit",
			weekday: "short",
			month: "short"
		};

		const formattedDate = new Date(date).toLocaleDateString("en-US", options);
		return formattedDate;
	}

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
					<SvgLocation size={24} />
					{currentWeather.name}, {currentWeather.sys.country}
				</div>
			</div>
			<div className={styles.mainContent}>
				<div className={styles.weatherInfo}>
					<div className={styles.weatherItem}>
						<div className={styles.block}>
							<WiThermometer size={48} color="#fff" />
							<div className={styles.temperature}>
								{weather.main.temp.toFixed(0)}
								<sup>°</sup>
							</div>
						</div>
						<div className={styles.secondaryInfo}>
							<div className={styles.feelLike}>
								Feels like {weather.main.feels_like}
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
									<WiCloudUp size={32} color="#fff" />
									<div className={styles.highLowInfo}>
										{weather.main.temp_max}
										<sup>°</sup>
									</div>
								</span>
								<span>
									<WiCloudDown size={32} color="#fff" />
									<div className={styles.highLowInfo}>
										{weather.main.temp_min}
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
					const getNestedValue = (obj: any, accessor: string) => {
						if (!item.accessor.includes(".")) return obj[accessor];
						return accessor
							.split(".")
							.reduce(
								(acc: any, key: string) => (acc && acc[key] !== "undefined" ? acc[key] : undefined),
								obj
							);
					};
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

export default CurrentWeather;
