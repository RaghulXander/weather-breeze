import React, { useState } from "react";
import AwesomeSlider from 'react-awesome-slider';
import { DayData, WeatherResponse } from "store/models/weather.model";
import { HourTile } from "../../atoms/HourTile/HourTile";
import { WiAlien } from "icons/Icons";
import CurrentWeather from "components/atoms/WeatherGrid/WeatherGrid";
import styles from "./Slider.module.scss"

export const SimpleSlider: React.FC<{ data: WeatherResponse[][] }> = ({ data }) => {
  const getFormattedTime = (time: string) => {
    return (
      new Date(time).toLocaleString('en-US', { hour: 'numeric', hour12: true })
    )
  }
  return (
    <AwesomeSlider animation="openAnimation" infinite={false}>
      {data.map((d, i) =>
        <div key={i} className={styles.panelContent}>
          <CurrentWeather />
          <div className={styles.tileContainer}>{d.map(h =>
            <HourTile icon={h.weather[0].icon} time={getFormattedTime(h.dt_txt)} weatherUnit={h.main.temp} onClick={() => { }} />)}</div>
          </div>
      )}
    </AwesomeSlider>
  )

};
