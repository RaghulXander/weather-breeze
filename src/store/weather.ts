import { Coords, Metrics, StateContext, WeatherResponse, WeatherState } from "./models/weather.model";
import { StoreActionApi, createHook, createStore } from "react-sweet-state";

import axios from "axios";

type StateType = StateContext<{ weather: WeatherResponse | null }> & {
	loading: boolean;
	error: {
		message: string;
	};
	currentWeather: WeatherState | null;
	status: string | null;
	hasLoaded: boolean;
	selectedLocation: string;
	selectedMetric: Metrics;
};

const initialState = (): StateType => ({
	state: {
		weather: null
	},
	error: {
		message: ""
	},
	hasLoaded: false,
	status: "",
	currentWeather: null,
	selectedLocation: "",
	selectedMetric: "Celsius",
	loading: false
});

const actions = {
	getWeather:
		(coord: Coords, description?: string) =>
		async ({ setState, getState }: StoreActionApi<StateType>) => {
			try {
				setState({
					...getState(),
					hasLoaded: false,
					loading: true
				});

				if (typeof coord === "object") {
					const response = await axios.get(
						`https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${coord.latitude}&lon=${coord.longitude}&appid=20c4bd51cf84f12ebda1a2d7f69862bc`
					);
					setState({
						...getState(),
						hasLoaded: true,
						loading: false,
						state: { weather: { ...response.data } },
						selectedLocation: description
					});
				} else {
					const response = await axios.get(
						`https://api.openweathermap.org/data/2.5/weather?q=${coord}&units=metric&appid=20c4bd51cf84f12ebda1a2d7f69862bc`
					);
					const data: WeatherResponse = response.data;
					if (data) {
						return data;
					} else {
						setState({
							...getState(),
							error: {
								message: "Location couldn't be retreived"
							}
						});
					}
				}
			} catch (error: any) {
				setState({
					...getState(),
					error: {
						message: new Error(error).message
					}
				});
			}
		},
	setMetricType:
		(type: Metrics) =>
		({ setState, getState }: StoreActionApi<StateType>) => {
			setState({
				...getState(),
				hasLoaded: true,
				selectedMetric: type
			});
		}
};

export const WeatherStore = createStore<StateType, typeof actions>({
	name: "weather-store",
	initialState: initialState(),
	actions
});

export const useWeatherStore = createHook(WeatherStore);
