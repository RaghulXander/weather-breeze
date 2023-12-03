export interface StateContext<T> {
	state: T;
}

export type Metrics = "Celsius" | "Fahrenheit";

export type Location = {
	coords: Coords;
	timestamp: number;
};

export type WeatherState = {
	weather: WeatherResponse | null;
};

export type ForecastState = {
	forecast: WeatherResponse[][];
};

type Main = {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	sea_level: number;
	grnd_level: number;
	humidity: number;
	visibility: number;
};

export type Coords = {
	latitude: number;
	longitude: number;
};

type Wind = {
	speed: number;
	deg: number;
	gust: number;
};

type Clouds = {
	all: number;
};

type Sys = {
	type: number;
	id: number;
	country: string;
	sunrise: number;
	sunset: number;
};

type Coord = {
	lon: number;
	lat: number;
};

type Weather = {
	id: number;
	main: string;
	description: string;
	icon: string;
};

export type WeatherResponse = {
	coord: Coord;
	weather: Weather[];
	main: Main;
	wind: Wind;
	clouds: Clouds;
	dt: string;
	sys: Sys;
	timezone: number;
	id: number;
	name: string;
	dt_txt: string;
	cod: number;
};
