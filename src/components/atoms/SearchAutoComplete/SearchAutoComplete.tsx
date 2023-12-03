import { FC, ChangeEvent, useState, KeyboardEvent } from "react";
import ReactDOM from "react-dom";
import useClickOutside from "hooks/useClickOutside";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import styles from "./SearchAutoComplete.module.scss";
import SvgSearch from "icons/Icons/Search";
import React from "react";

const acceptedKeys = ["ArrowUp", "ArrowDown", "Escape", "Enter"];
type Suggestion = google.maps.places.AutocompletePrediction;

interface DropdownOptionsProps {
	isOpen: boolean;
	options: Suggestion[];
	onClick: (option: Suggestion) => void;
	onMouseEnter: (id: number) => void;
	onMouseLeave: () => void;
	portalRoot: Element | null;
}

const SuggestionOptions: React.FC<DropdownOptionsProps> = ({
	isOpen,
	options,
	onClick,
	onMouseEnter,
	portalRoot,
	onMouseLeave
}) => {
	if (!isOpen || !portalRoot) return null;

	let optionList;

	if (options.length === 0) {
		optionList = (
			<div className={styles["suggestionList"]}>
				<div onMouseLeave={onMouseLeave} role="listbox" className={styles["suggestion"]}>
					<div className={styles["itemContent"]}>
						<span>No Result found</span>
					</div>
				</div>
			</div>
		);
	}

	optionList = (
		<div className={styles["suggestionList"]}>
			{options.map((option: Suggestion, idx: number) => {
				const {
					place_id,
					structured_formatting: { main_text, secondary_text }
				} = option;

				return (
					<div onMouseLeave={onMouseLeave} role="listbox" className={styles["suggestion"]}>
						<div
							className={styles["itemContent"]}
							key={place_id}
							onClick={() => onClick(option)}
							onMouseEnter={() => onMouseEnter(idx)}
						>
							<span>{main_text}</span>
							<small>{secondary_text}</small>
						</div>
					</div>
				);
			})}
		</div>
	);

	return ReactDOM.createPortal(optionList, portalRoot);
};

export const SearchAutoComplete = () => {
	const options = {
		callbackName: "initMap",
		debounce: 300
	};
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions
	} = usePlacesAutocomplete(options);

	const portalRoot = document.getElementById("dropdown-portal-root");
	const hasSuggestions = status === "OK";
	const [currIndex, setCurrIndex] = useState<number | null>(null);

	// Used to track outside
	const dropdownRef = useClickOutside(() => {
		clearSuggestions();
	});

	const dismissSuggestions = () => {
		setCurrIndex(null);
		clearSuggestions();
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (!hasSuggestions || !acceptedKeys.includes(e.key)) return;

		if (e.key === "Enter" || e.key === "Escape") {
			dismissSuggestions();
			return;
		}

		let nextIndex: number | null;

		if (e.key === "ArrowUp") {
			e.preventDefault();
			nextIndex = currIndex ?? data.length;
			nextIndex = nextIndex && nextIndex > 0 ? nextIndex - 1 : null;
		} else {
			nextIndex = currIndex ?? -1;
			nextIndex = nextIndex < data.length - 1 ? nextIndex + 1 : null;
		}

		setCurrIndex(nextIndex);
		// @ts-ignore
		setValue(data[nextIndex] ? data[nextIndex].description : cachedVal, false);
	};

	const handleSelect =
		({ description }: Suggestion) =>
		() => {
			// When user selects a place, we can replace the keyword without request data from API
			// by setting the second parameter to "false"
			setValue(description, false);
			clearSuggestions();

			// Get latitude and longitude via utility functions
			getGeocode({ address: description }).then((results) => {
				const { lat, lng } = getLatLng(results[0]);
				console.log("Coordinates: ", { lat, lng });
			});
		};

	return (
		<div className={styles["searchContainer"]} ref={dropdownRef}>
			<div className={styles["inputWrapper"]}>
				<input
					type="text"
					className={styles["input"]}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onKeyDown={handleKeyDown}
					disabled={!ready}
					placeholder="Search location..."
				/>
				<span className={styles["icon"]}>
					<SvgSearch size={24} color="#AD36CB" />
				</span>
			</div>
			<div id="dropdown-portal-root" />
			{hasSuggestions && (
				<SuggestionOptions
					portalRoot={portalRoot}
					isOpen={hasSuggestions}
					options={data}
					onClick={handleSelect}
					onMouseEnter={(idx) => setCurrIndex(idx)}
					onMouseLeave={() => setCurrIndex(null)}
				/>
			)}
		</div>
	);
};
