import { Metrics, WeatherResponse } from "store/models/weather.model";

export const getDataByDay = (forecast: WeatherResponse[]) => {
	const days = 5; // Assuming you have 5 days of data
	const dataPerDay = forecast.length / days;
	let weatherResponseList = [];

	for (let i = 0; i < days; i++) {
		const startIndex = i * dataPerDay;
		const endIndex = startIndex + dataPerDay;
		const weatherResponse = forecast.slice(startIndex, endIndex);

		weatherResponseList.push(weatherResponse);
	}

	return weatherResponseList;
};

export const getTemperature = (celsius: number, type: Metrics = "Celsius"): number => {
	if (type === "Fahrenheit") return ((celsius * 9) / 5 + 32).toFixed(2);
	return celsius.toFixed(2);
};
