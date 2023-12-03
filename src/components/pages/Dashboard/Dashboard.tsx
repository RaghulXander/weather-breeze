import React, { useState } from "react";
import { Loader } from "components/atoms";
import CurrentWeather from "components/atoms/WeatherGrid/WeatherGrid";
import AwesomeSlider from "react-awesome-slider";
import { HourTile } from "../../atoms/HourTile/HourTile";
import { useForecastStore } from "store/forecast";
import { Location } from "store/models/weather.model";
import { useWeatherStore } from "store/weather";
import styles from "./Dashboard.module.scss";

export const Dashboard = () => {
	const [{ state, isMounted }, weatherActions] = useWeatherStore();
	const [
		{
			state: { forecast },
			isMounted: isForecastMounted
		},
		forecastActions
	] = useForecastStore();

	React.useEffect(() => {
		navigator.geolocation.getCurrentPosition((response: Location) => {
			weatherActions.getWeather(response.coords);
			forecastActions.getForecast(response.coords);
		});
	}, []);

	const getFormattedTime = (time: string) => {
		return new Date(time).toLocaleString("en-US", {
			hour: "numeric",
			hour12: true
		});
	};

	if (!isMounted || !isForecastMounted) return <Loader />;

	return (
		<div className={styles.dashboardContainer}>
			<AwesomeSlider animation="openAnimation" infinite={false} className={styles.sliderContainer}>
				{forecast.map((dayForecast, i) => (
					<div key={i} className={styles.panelContent}>
						<CurrentWeather weather={dayForecast[i]} />
						<div className={styles.tileContainer}>
							{dayForecast.map((hourSlot) => (
								<HourTile
									icon={hourSlot.weather[0].icon}
									time={getFormattedTime(hourSlot.dt_txt)}
									weatherUnit={hourSlot.main.temp}
									onClick={() => {}}
								/>
							))}
						</div>
					</div>
				))}
			</AwesomeSlider>
		</div>
	);
};

export default Dashboard;
