import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { Location } from "store/models/weather.model";

export const useGeolocation = () => {
	const ERROR_CODES = {
		PERMISSION_DENIED: 1,
		POSITION_UNAVAILABLE: 2,
		TIMEOUT: 3
	};

	const [latitude, setLatitude] = useState<number | null>(0);
	const [longitude, setLongitude] = useState<number | null>(0);

	const onSuccess = (response: Location) => {
		if (latitude !== response.coords.latitude || longitude !== response.coords.longitude) {
			setLatitude(response.coords.latitude);
			setLongitude(response.coords.longitude);
		}
	};

	const retryPermission = useCallback(() => {
		navigator.geolocation.getCurrentPosition(onSuccess, () => {
			toast.error("An error occurred while retrieving location.");
		});
	}, []);

	const onError = (error: GeolocationPositionError) => {
		switch (error.code) {
			case ERROR_CODES.PERMISSION_DENIED:
				toast.error("Please allow location access and try again by clicking close", {
					autoClose: false,
					onClose: () => {
						navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
							if (permissionStatus.state !== "denied") retryPermission();
						});
					}
				});
				break;
			case ERROR_CODES.POSITION_UNAVAILABLE:
			case ERROR_CODES.TIMEOUT:
			default:
				toast.error(error.message);
				//console.error(error.message);
				break;
		}
	};

	const locateMe = useCallback((): Promise<[number | null, number | null]> => {
		return new Promise((resolve) => {
			navigator.geolocation.getCurrentPosition(
				(response: Location) => {
					if (latitude !== response.coords.latitude || longitude !== response.coords.longitude) {
						setLatitude(response.coords.latitude);
						setLongitude(response.coords.longitude);
					}
					resolve([response.coords.latitude, response.coords.longitude]);
				},
				(error) => {
					onError(error);
					// adding default values when some browsers block location and page goes blank
					resolve([12.3012693, 76.6392175]);
				}
			);
		});
	}, [latitude, longitude]);
	return { latitude, longitude, locateMe };
};
