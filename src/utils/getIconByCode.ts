import { IconProps } from "icons";
import { WiDaySunny, WiCloudy, WiDayCloudyHigh, WiDayHaze, WiDayLightning, WiDayShowers, WiDaySleet, WiDayStormShowers, WiRain, WiSnow } from "icons/Icons";

type TIconComponent = React.ComponentType<IconProps>;
export const getWeatherIconByCode = (code: number): TIconComponent => {
  let Icon: TIconComponent;

  switch (code) {
    // Clear
    case 800:
      Icon = WiDaySunny;
      break;

    // Cloud
    case 801:
    case 802:
      Icon = WiDayCloudyHigh;
      break;
    case 803:
    case 804:
      Icon = WiCloudy;
      break;

    // Rain
    case 500:
    case 501:
    case 520:
    case 521:
    case 511:
      Icon = WiRain;
      break;
    case 502:
    case 503:
    case 504:
    case 522:
    case 531:
      Icon = WiDayStormShowers;
      break;

    // Drizzle
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
      Icon = WiDayShowers;
      break;

    // Thunderstorm
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232:
      Icon = WiDayLightning;
      break;

    // Snow
    case 600:
    case 601:
    case 602:
    case 612:
    case 613:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
      Icon = WiSnow;
      break;
    case 611:
      Icon = WiDaySleet;
      break;

    // Atmosphere
    case 701:
    case 711:
    case 721:
    case 731:
    case 741:
    case 751:
    case 761:
    case 762:
    case 771:
    case 781:
      Icon = WiDayHaze;
      break;

    default:
      Icon = WiDaySunny;
  }
  return Icon;
};

export default getWeatherIconByCode;
