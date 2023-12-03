import React from "react";
import styles from "./HourTile.module.scss";

type THourTileProps = {
	icon: string;
	time: string;
	weatherUnit: number;
	onClick: () => void;
};

export const HourTile: React.FC<THourTileProps> = ({ icon, time, weatherUnit, onClick }) => {
	const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
	return (
		<div className={styles.tileWrapper} onClick={onClick}>
			<span className={styles.timeText}>{time}</span>
			<img id="wicon" className={styles.icon} src={iconUrl} alt="Weather icon" />
			<span className={styles.weather}>
				{weatherUnit}
				<sup>°</sup>
			</span>
		</div>
	);
};
