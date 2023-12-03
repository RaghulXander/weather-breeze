import React from "react";
import styles from "./HourTile.module.scss"
import { IconProps } from "../../../icons/index";

type THourProps = {
  icon: string;
  time: string;
  weatherUnit: number;
  onClick: () => void
}

export const HourTile: React.FC<THourProps> = ({ icon, time, weatherUnit, onClick}) =>{
    return (
       <div className={styles.tileWrapper} onClick={onClick}>
           <span className={styles.timeText}>{time}</span>
           <img id="wicon" className={styles.icon} src={`http://openweathermap.org/img/w/${icon}.png`} alt="Weather icon" />
          <span className={styles.weather}> {weatherUnit}<sup>°</sup></span>
      </div>
    )
}
