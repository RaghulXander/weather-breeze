import React, { useMemo } from 'react';
import styles from "./WeatherGrid.module.scss"
import { WiCloudDown, WiCloudUp, WiDayWindy, WiHumidity, WiNightClear, WiStrongWind, WiThermometer } from 'icons/Icons';
import { useWeatherStore } from 'store/weather';
import SvgWiThermometer from 'icons/Icons/weather/WiThermometer';
import SvgLocation from 'icons/Icons/Location';
import getWeatherIconByCode from 'utils/getIconByCode';

export const CurrentWeather: React.FC = () => {
  const [{ state }] = useWeatherStore();

  type Item = {
    id: string;
    name: string;
    accessor: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>
  }

  function formatDate() {
    const options = {
      day: '2-digit',
      weekday: 'short',
      month: 'short',
      timeZone: 'UTC',
      timeZoneName: 'short',
    };

    const formattedDate = new Date().toLocaleDateString('en-US', options);
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
    ]

  }, []);

  if (!state?.weather) return null;
  const WeatherIcon = getWeatherIconByCode(state.weather.weather[0].id);

  return (
      <div className={styles.container}>
        <div className={styles.header}>
        <div className={styles.location}>
            <SvgLocation size={30} />
            {state.weather.name}, {state.weather.sys.country}
          </div>
          <div className={styles.date}>
            {formatDate()}
          </div>
        </div>
        <div className={styles.mainContent}>
        <div className={styles.weatherInfo}>
          <div className={styles.weatherItem}>
            <WiThermometer size={48} color="#fff" />
            <div className={styles.temperature}>{state.weather.main.temp.toFixed(0)}<sup>°</sup></div>
          </div>
          <div className={styles.weatherItem}>
             <WeatherIcon size={64} color="#fff" />
            <div className={styles.info}>{state.weather.weather[0].main}</div>
          </div>
        </div>
        <div className={styles.secondaryInfo}>
          <div className={styles.feelLike}>Feels like {state.weather.main.feels_like}<sup>°</sup></div>
          <div className={styles.highLow}>
            <span>
              <WiCloudUp size={32} color="#fff" />
              <div className={styles.highLowInfo}>{state.weather.main.temp_max}<sup>°</sup></div>
            </span>
            <span>
              <WiCloudDown size={32} color="#fff" />
              <div className={styles.highLowInfo}>{state.weather.main.temp_min}<sup>°</sup></div>
            </span>
          </div>
        </div>
        </div>
        <div className={styles.infoContainer}>
        {infoItems.map(item => {
          const Icon = item.icon;
          const getNestedValue = (obj: any, accessor: string) => {
            if (!item.accessor.includes(".")) return obj[accessor];
            return accessor.split('.').reduce((acc: any, key: string) => (acc && acc[key] !== 'undefined') ? acc[key] : undefined, obj);
          };
          return (
            <div id={item.id} className={styles.item}>
              <span className={styles.value}>
                 <Icon size={32} color="#fff"/>
                {state.weather ? getNestedValue(state.weather, item.accessor) : "-"}
              </span>
              <span className={styles.name}>
                {item.name}
              </span>
            </div>
          )
        })}
        </div>
      </div>
  );
};

export default CurrentWeather;
