import { useState, useEffect } from "react";

const useSwipeableMessage = () => {
	const [showMessage, setShowMessage] = useState(false);

	useEffect(() => {
		const hasSeenMessage = localStorage.getItem("hasSeenSwipeMessage");
		if (!hasSeenMessage) {
			setShowMessage(true);
			localStorage.setItem("hasSeenSwipeMessage", "true");
		}
	}, []);

	const resetSwipeMessage = () => {
		localStorage.removeItem("hasSeenSwipeMessage");
	};

	return { showMessage, resetSwipeMessage };
};

export default useSwipeableMessage;
