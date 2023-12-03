import { DayData, ForecastState, WeatherResponse } from "store/models/weather.model";

export const getDataByDay = (forecast: DayData[]) => {
	const days = 5; // Assuming you have 5 days of data
	const dataPerDay = forecast.length / days;
	let dayDataList = [];

	for (let i = 0; i < days; i++) {
		const startIndex = i * dataPerDay;
		const endIndex = startIndex + dataPerDay;
		const dayData = forecast.slice(startIndex, endIndex);

		dayDataList.push(dayData);
	}

	return dayDataList;
};
