import { InsightViewer, Modal } from "components/templates";
import { Loader, WeatherGrid } from "components/atoms";
import React, { useState } from "react";

import AwesomeSlider from "react-awesome-slider";
import { HourTile } from "../../atoms/HourTile/HourTile";
import { WeatherResponse } from "store/models/weather.model";
import { getTemperature } from "../../../utils/helper";
import styles from "./Dashboard.module.scss";
import { useForecastStore } from "store/forecast";
import { useWeatherStore } from "store/weather";

export const Dashboard = () => {
	const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
	const [selectHourSlot, setSelectedSlot] = useState<WeatherResponse | null>(null);
	const [{ loading, selectedMetric }] = useWeatherStore();
	const [
		{
			state: { forecast },
			loading: isForecastLoading
		}
	] = useForecastStore();

	const getFormattedTime = (time: string) => {
		return new Date(time).toLocaleString("en-US", {
			hour: "numeric",
			hour12: true
		});
	};

	console.log(loading, isForecastLoading);
	if (loading || isForecastLoading)
		return (
			<div className={styles.dashboardContainer}>
				<Loader />
			</div>
		);

	return (
		<div className={styles.dashboardContent}>
			{forecast.length > 0 && (
				<AwesomeSlider animation="openAnimation" infinite={false} className={styles.sliderContainer}>
					{forecast.map((dayForecast, i) => (
						<div key={i} className={styles.panelContent}>
							<WeatherGrid weather={dayForecast[i]} />
							<div className={styles.tileContainer}>
								<div className={styles.highlights}>Today's Highlights</div>
								<div className={styles.HourList}>
									{dayForecast.map((hourSlot) => (
										<HourTile
											icon={hourSlot.weather[0].icon}
											time={getFormattedTime(hourSlot.dt_txt)}
											weatherUnit={getTemperature(hourSlot.main.temp, selectedMetric)}
											onClick={() => {
												setIsModalOpen(true);
												setSelectedSlot(hourSlot);
											}}
										/>
									))}
								</div>
							</div>
						</div>
					))}
				</AwesomeSlider>
			)}
			<Modal isOpen={isModalOpen && !!selectHourSlot} onClick={() => setIsModalOpen(false)}>
				{selectHourSlot && <InsightViewer data={selectHourSlot} />}
			</Modal>
		</div>
	);
};

export default Dashboard;
