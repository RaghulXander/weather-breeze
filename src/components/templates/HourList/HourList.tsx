import React from "react";

type THourProps = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  time: string;
  weatherUnit: string;
  onClick: () => void
}

const HourTile: React.FC<THourProps> = ({ icon: Icon, time, weatherUnit, onClick}) =>{
    return (
       <React.Fragment>
            <section role="button" className="future-weather-container d-flex align-items-center justify-content-center flex-column brand-bg-white px-4  rounded-3 shadow-sm mx-2 my-2" onClick={onClick}>
                <section className="weather-wrapper d-flex flex-column align-items-center justify-content-center">
                    <p className="brand-small-text-2  py-1 text-center m-0">{time}</p>
                    <span className="weather-icon-section py-1">
                            <Icon />
                    </span>
                    <p className="brand-small-text fw-bold text-center m-0"> {weatherUnit}<sup>o</sup></p>
                </section>
            </section>
       </React.Fragment>
    )
}


export default HourTile;
