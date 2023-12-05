import { Coords, ForecastState, StateContext, WeatherResponse } from "./models/weather.model";
import { StoreActionApi, createHook, createStore } from "react-sweet-state";

import axios from "axios";
import { getDataByDay } from "utils/helper";

type StateType = StateContext<ForecastState> & {
	loading: boolean;
	error: {
		message: string;
	};
	activeDay: WeatherResponse | null;
	status: string | null;
	hasLoaded: boolean;
};

const initialState = (): StateType => ({
	state: {
		forecast: []
	},
	error: {
		message: ""
	},
	hasLoaded: false,
	status: "",
	activeDay: null,
	loading: false
});

const actions = {
	getForecast:
		(coord: Coords | string) =>
		async ({ setState, getState }: StoreActionApi<StateType>) => {
			try {
				setState({
					...getState(),
					loading: true,
					hasLoaded: false
				});
				if (typeof coord === "object") {
					const response = await axios.get(
						`https://api.openweathermap.org/data/2.5/forecast?&units=metric&lat=${coord.latitude}&lon=${coord.longitude}&appid=d857d025c6e16813c0a2c83d4f46029f`
					);
					setState({
						...getState(),
						hasLoaded: true,
						loading: false,
						state: {
							forecast: getDataByDay(response.data.list)
						}
					});
				}
			} catch (error: any) {
				setState({
					...getState(),
					error: {
						message: new Error(error).message
					},
					hasLoaded: true,
					loading: false
				});
			}
		}
};

export const ForecastStore = createStore<StateType, typeof actions>({
	name: "forecast-store",
	initialState: initialState(),
	actions
});

export const useForecastStore = createHook(ForecastStore);
