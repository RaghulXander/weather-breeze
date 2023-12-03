import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Switch from "react-switch";
import { Locate, WeatherLogo, WiCelsius, WiFahrenheit } from "icons/Icons";
import styles from "./Header.module.scss";
import { SearchAutoComplete } from "components/atoms";
import { check } from "prettier";

type IHeader = {
	theme?: boolean;
	setTheme?: React.Dispatch<React.SetStateAction<boolean>>;
	onClick: () => {};
};

export const Header: React.FC<IHeader> = ({ theme, setTheme, onClick }) => {
	const [burger, setBurger] = React.useState<boolean>(false);
	const [isVisible, setVisible] = React.useState<boolean>(false);
	const location = useLocation();
	const [toggled, setToggled] = React.useState(false);
	const getPath = () => {
		if (location.pathname === "/") {
			return "Home";
		} else {
			const firstLetter = location.pathname.charAt(1).toUpperCase();
			return firstLetter + location.pathname.substring(2);
		}
	};
	return (
		<header className={styles.containerWrapper}>
			<nav className={styles.container}>
				<div className={styles.logo}>
					<NavLink to="/">
						{/*<WIwi*/}
						<WeatherLogo size={48} />
						<div>W-Breeze</div>
					</NavLink>
				</div>
				<div className={styles.searchContainer}>
					<SearchAutoComplete />
				</div>
				<div className={styles.controlActions}>
					<button className={styles.locateMe} onClick={() => {}}>
						<Locate size={24} color="#fff" />
						<span>Locate me</span>
					</button>
					<Switch
						onColor={"#AD36CB"}
						offColor={"#797979"}
						className={styles.toggleSwitch}
						checkedIcon={
							<span className={styles.toggleValue}>
								F<sup>°</sup>
							</span>
						}
						uncheckedIcon={
							<span className={styles.toggleValue}>
								C <sup>°</sup>
							</span>
						}
						onChange={(checked) => {
							setToggled(checked);
							//onClick();
						}}
						checked={toggled}
						height={24}
						borderRadius={12}
					/>
				</div>
			</nav>
		</header>
	);
};
