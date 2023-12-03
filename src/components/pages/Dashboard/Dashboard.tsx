import { Loader } from 'components/atoms';
import CurrentWeather from 'components/atoms/WeatherGrid/WeatherGrid';
import { SimpleSlider } from 'components/templates/Slider/Slider';
import React from 'react';
import { useForecastStore } from 'store/forecast';
import { Location } from 'store/models/weather.model';
import { useWeatherStore } from 'store/weather';
import styles from "./Dashboard.module.scss"


export const Dashboard = () => {
  const [{ state, isMounted }, weatherActions] = useWeatherStore();
  const [{ state: { forecast }, isMounted: isForecastMounted }, forecastActions] = useForecastStore();


  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (response: Location) => {
        weatherActions.getWeather(response.coords);
        forecastActions.getForecast(response.coords);
      }
    );
    }, []);

  if (!isMounted || !isForecastMounted) return <Loader />

	return (
    <div className={styles.dashboardContainer}>
      {/*<CurrentWeather />*/}
      <SimpleSlider data={forecast}  />
    </div>
	)
}

export default Dashboard
