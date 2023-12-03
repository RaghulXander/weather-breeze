import axios from "axios";
import { createHook, type StoreActionApi, createStore } from "react-sweet-state";
import { type StateContext, WeatherResponse, Coords, WeatherState } from "./models/weather.model";

type StateType = StateContext<{ weather: WeatherResponse | null }> & {
	loading: boolean;
	currentWeather: WeatherState | null;
	status: string | null;
	isMounted: boolean;
};

const initialState = (): StateType => ({
	state: {
		weather: null
	},
	isMounted: false,
	status: "",
	currentWeather: null,
	loading: false
});

const actions = {
	getWeather:
		(coord: Coords | string) =>
		async ({ setState, getState }: StoreActionApi<StateType>) => {
			try {
				const {
					state: { weather },
					isMounted
				} = getState();

				if (!isMounted) {
					if (typeof coord === "object") {
						const response = await axios.get(
							`https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${coord.latitude}&lon=${coord.longitude}&appid=20c4bd51cf84f12ebda1a2d7f69862bc`
						);
						setState({
							...getState(),
							isMounted: true,
							state: { weather: { ...response.data } }
						});
					}
				} else {
					const response = await axios.get(
						`https://api.openweathermap.org/data/2.5/weather?q=${coord}&units=metric&appid=20c4bd51cf84f12ebda1a2d7f69862bc`
					);
					const data: WeatherResponse = response.data;
					if (data) {
						return data;
					} else {
						//return rejectWithValue('rejected');
					}
				}
			} catch (error: any) {
				//return rejectWithValue('rejected');
			}
		}
	//setEvent:
	//	(eventId: number | undefined) =>
	//	async ({ setState, getState }: StoreActionApi<StateType>) => {
	//		if (!eventId) return;
	//		setState({
	//			loading: true
	//		});
	//		try {
	//			const event = await db.events.get(eventId);
	//			if (event) {
	//				setState({
	//					currentEvent: { ...event },
	//					loading: false
	//				});
	//			} else {
	//				console.error(`Event with ID ${eventId} not found.`);
	//			}
	//		} catch (error) {
	//			console.error('Error retrieving event:', error);
	//		}
	//	},
	//updateEvent:
	//	(data: Event) =>
	//	async ({ setState, getState }: StoreActionApi<StateType>) => {
	//		try {
	//			setState({
	//				loading: true
	//			});
	//			await db.events.update(data.id as number, data);
	//			setState({
	//				loading: false
	//			});
	//		} catch (error) {
	//			console.error('Error updating event:', error);
	//		}
	//	},
	//deleteEvent:
	//	(eventId: number | undefined, callback: () => void) =>
	//	async ({ setState, getState }: StoreActionApi<StateType>) => {
	//		if (!eventId) return;
	//		setState({
	//			loading: true
	//		});
	//		try {
	//			await db.events.delete(eventId as number);
	//			callback();
	//			setState({
	//				loading: false,
	//				currentEvent: undefined
	//			});
	//		} catch (error) {
	//			console.error('Error updating event:', error);
	//		}
	//	},
	//createEvent:
	//	(data: { date: Date; start: Date; end: Date; name: string }, callback: () => void) =>
	//	async ({ setState, getState }: StoreActionApi<StateType>) => {
	//		const { date, name, start, end } = data;
	//		setState({
	//			loading: true
	//		});
	//		function generateUniqueID() {
	//			return Math.floor(Math.random() * 9000) + 1000;
	//		}
	//		const id = generateUniqueID();
	//		const newEvent: Event = {
	//			id,
	//			name: name,
	//			status: 'confirmed',
	//			created: date.toISOString(),
	//			updated: date.toISOString(),
	//			summary: 'Meeting with team',
	//			description: 'Discuss project details',
	//			creator: { email: 'user@example.com', displayName: 'User', self: true },
	//			organizer: { email: 'user@example.com', displayName: 'User', self: true },
	//			attendees: [
	//				{ email: 'attendee1@example.com', displayName: 'Attendee 1', self: false },
	//				{ email: 'attendee2@example.com', displayName: 'Attendee 2', self: false }
	//			],
	//			startTime: new Date(start),
	//			endTime: new Date(end),
	//			date: date.toDateString()
	//		};
	//		const res = await db.events.add(newEvent, id);
	//		setState({
	//			loading: false
	//		});
	//		callback();
	//	},
	//reset:
	//	() =>
	//	({ setState }: StoreActionApi<StateType>) => {
	//		setState(initialState());
	//	}
};

export const WeatherStore = createStore<StateType, typeof actions>({
	name: "weather-store",
	initialState: initialState(),
	actions
});

export const useWeatherStore = createHook(WeatherStore);
