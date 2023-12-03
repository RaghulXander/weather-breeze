import React from "react";
import styles from "./Loader.module.scss";

export const Loader = () => (
	<div className={styles.loadingContainer}>
		<div className={styles.loadingDots}>
			<div className={styles.dot}></div>
			<div className={styles.dot}></div>
			<div className={styles.dot}></div>
		</div>
	</div>
);

export default Loader;
