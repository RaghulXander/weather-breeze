import { FC, ChangeEvent, useState, KeyboardEvent } from "react";
import ReactDOM from 'react-dom';
import useClickOutside from "hooks/useClickOutside";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import styles from "./SearchAutoComplete.module.scss";
import SvgSearch from "icons/Icons/Search";
import React from "react";

const acceptedKeys = ["ArrowUp", "ArrowDown", "Escape", "Enter"];
type Suggestion = google.maps.places.AutocompletePrediction;

interface DropdownOptionsProps {
  isOpen: boolean;
  options: Suggestion[]
  onClick: (option: Suggestion) => void;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
  portalRoot: Element | null;
}

const SuggestionOptions: React.FC<DropdownOptionsProps> = ({ isOpen, options, onClick, onMouseEnter, portalRoot, onMouseLeave }) => {
  if (!isOpen || !portalRoot) return null;

  return ReactDOM.createPortal(
    <div className={styles["suggestionList"]}>
      {options.map((option: Suggestion, idx: number) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = option;

        return (
          <div
            onMouseLeave={onMouseLeave}
            role="listbox"
            className={styles["suggestion"]}
          >
            <div className={styles["itemContent"]} key={place_id} onClick={() => onClick(option)} onMouseEnter={() => onMouseEnter(idx)}>
              <span>{main_text}</span>
              <small>{secondary_text}</small>
            </div>
          </div>

        )
      })}
    </div>,
    portalRoot
  );
};

export const SearchAutoComplete = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    callbackName: "initMap",
    debounce: 300,
  });
  console.log("status", status, data);
  const portalRoot = document.getElementById('dropdown-portal-root');
  const hasSuggestions = status === "OK";
  const [currIndex, setCurrIndex] = useState<number | null>(null);
  const dropdownRef = useClickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
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

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleEnter = (idx: number) => () => {
    setCurrIndex(idx);
  };

  const handleLeave = () => {
    setCurrIndex(null);
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
          console.log("📍 Coordinates: ", { lat, lng });
        });
      };

  return (
    <div className={styles['searchContainer']} ref={dropdownRef}>
      <div className={styles['inputWrapper']}>
        <input
          type="text"
          className={styles['input']}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={!ready}
          placeholder="Search location..."
        />
        <span className={styles["icon"]}>
          <SvgSearch size={24} />
        </span>
      </div>
      <div id="dropdown-portal-root" />
      {hasSuggestions && (
        <SuggestionOptions
          portalRoot={portalRoot}
          isOpen={hasSuggestions}
          options={data}
          onClick={handleSelect}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        />
      )}
    </div>
  );
};
