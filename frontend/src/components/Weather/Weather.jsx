import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BsCloudFog,
  BsCloudRain,
  BsCloudSnow,
  BsCloudSun,
  BsSun,
  BsSunrise,
  BsSunset,
  BsThermometerSnow,
  BsWind,
} from "react-icons/bs";
import {
  WiDaySnow,
  WiDaySnowThunderstorm,
  WiDayThunderstorm,
  WiHumidity,
  WiMoonAltFirstQuarter,
  WiMoonAltThirdQuarter,
  WiMoonAltWaningCrescent5,
  WiMoonAltWaningGibbous2,
  WiMoonAltWaxingCrescent5,
  WiMoonAltWaxingGibbous2,
  WiMoonFull,
  WiMoonNew,
  WiMoonrise,
  WiMoonset,
  WiWindDeg,
  WiThunderstorm,
} from "react-icons/wi";
import { FaCloudSunRain, FaTemperatureLow } from "react-icons/fa";
import { AiOutlineCloud } from "react-icons/ai";
import { RiCloudWindyLine, RiMistFill } from "react-icons/ri";
import { BiCloudRain } from "react-icons/bi";
// import { IoThunderstormSharp } from "react-icons/io";

import "./Weather.css";

function Weather() {
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [moonrise, setMoonrise] = useState();
  const [moonset, setMoonset] = useState();
  const [moonphase, setMoonPhase] = useState();
  const [illumination, setIllumination] = useState();

  const [temperature, setTemperature] = useState();
  const [humidity, setHumidity] = useState();
  const [wind, setWind] = useState();
  const [windDirection, setWindDirection] = useState();
  const [condition, setCondition] = useState();
  // eslint-disable-next-line no-unused-vars
  const [conditionIcon, setConditionIcon] = useState();

  function convertTimeTo24(time) {
    const [timeStr, period] = time.split(" ");

    // eslint-disable-next-line prefer-const
    let [hours, minutes] = timeStr.split(":");

    if (period === "PM" && hours !== "12") {
      hours = parseInt(hours, 10) + 12;
    } else if (period === "AM" && hours === "12") {
      hours = "00";
    }
    return `${hours}:${minutes}`;
  }

  const baseURLastro =
    "http://api.weatherapi.com/v1/astronomy.json?key=48015afa1f274a1d95a100916232104&q=Saint jean le blanc&lang=fr";

  const baseURLweather =
    "http://api.weatherapi.com/v1/current.json?key=48015afa1f274a1d95a100916232104&q=Saint jean le blanc&aqi=no";

  useEffect(() => {
    axios.get(baseURLastro).then((response) => {
      setSunrise(convertTimeTo24(response.data.astronomy.astro.sunrise));
      setSunset(convertTimeTo24(response.data.astronomy.astro.sunset));
      setMoonrise(convertTimeTo24(response.data.astronomy.astro.moonrise));
      setMoonset(convertTimeTo24(response.data.astronomy.astro.moonset));
      setMoonPhase(response.data.astronomy.astro.moon_phase);
      setIllumination(response.data.astronomy.astro.moon_illumination);
    });
  }, []);

  useEffect(() => {
    axios.get(baseURLweather).then((response) => {
      setTemperature(response.data.current.temp_c);
      setHumidity(response.data.current.humidity);
      setWind(response.data.current.wind_kph);
      setWindDirection(response.data.current.wind_dir);
      setCondition(response.data.current.condition.text);
      setConditionIcon(response.data.current.condition.icon);
    });
  }, []);

  const conditionPicture = () => {
    switch (condition) {
      case "Sunny":
      case "Clear":
        return <BsSun className="weather-condition" />;
      case "Partly cloudy":
        return <BsCloudSun className="weather-condition" />;
      case "Cloudy":
      case "Overcast":
        return <AiOutlineCloud className="weather-condition" />;
      case "Mist":
        return <RiMistFill className="weather-condition" />;
      case "Patchy rain possible":
      case "Patchy light rain":
      case "Light rain":
      case "Moderate rain at times":
      case "Moderate rain":
      case "Heavy rain at times":
      case "Heavy rain":
      case "Light freezing rain":
      case "Moderate or heavy freezing rain":
      case "Light sleet":
      case "Moderate or heavy sleet":
      case "Light rain shower":
      case "Moderate or heavy rain shower":
      case "Torrential rain shower":
      case "Light sleet showers":
      case "Moderate or heavy sleet showers":
        return <FaCloudSunRain className="weather-condition" />;
      case "Patchy snow possible":
      case "Patchy light snow":
      case "Light snow":
      case "Patchy moderate snow":
      case "Moderate snow":
      case "Patchy heavy snow":
      case "Heavy snow":
      case "Ice pellets":
      case "Light snow showers":
      case "Moderate or heavy snow showers":
      case "Light showers of ice pellets":
      case "Moderate or heavy showers of ice pellets":
        return <WiDaySnow className="weather-condition" />;
      case "Patchy sleet possible":
        return <WiDaySnow className="weather-condition" />;
      case "Patchy freezing drizzle possible":
        return <BsThermometerSnow className="weather-condition" />;
      case "Thundery outbreaks possible":
        return <WiDayThunderstorm className="weather-condition" />;
      case "Blowing snow":
        return <BsCloudSnow className="weather-condition" />;
      case "Blizzard":
        return <RiCloudWindyLine className="weather-condition" />;
      case "Fog":
      case "Freezing fog":
        return <BsCloudFog className="weather-condition" />;
      case "Patchy light drizzle":
      case "Light drizzle":
        return <BsCloudRain className="weather-condition" />;
      case "Freezing drizzle":
      case "Heavy freezing drizzle":
        return <BiCloudRain className="weather-condition" />;
      case "Patchy light rain with thunder":
      case "Moderate or heavy rain with thunder":
        return <WiThunderstorm className="weather-condition" />;
      case "Patchy light snow with thunder":
      case "Moderate or heavy snow with thunder":
        return <WiDaySnowThunderstorm className="weather-condition" />;
      default:
        return <BsSun className="weather-condition" />;
    }
  };

  const lunarIcon = () => {
    switch (moonphase) {
      case "New Moon":
        return <WiMoonNew className="weather-moon-icon" />;
      case "First Quarter":
        return <WiMoonAltFirstQuarter className="weather-moon-icon" />;
      case "Last Quarter":
        return <WiMoonAltThirdQuarter className="weather-moon-icon" />;
      case "Waxing Crescent":
        return <WiMoonAltWaxingCrescent5 className="weather-moon-icon" />;
      case "Waning Crescent":
        return <WiMoonAltWaningCrescent5 className="weather-moon-icon" />;
      case "Waxing Gibbous":
        return <WiMoonAltWaxingGibbous2 className="weather-moon-icon" />;
      case "Waning Gibbous":
        return <WiMoonAltWaningGibbous2 className="weather-moon-icon" />;
      default:
        return <WiMoonFull className="weather-moon-icon" />;
    }
  };

  function temperatureIconColor() {
    if (temperature > "28") {
      return "weather-temperature-hot";
    }
    if (temperature < "28" && temperature >= "20") {
      return "weather-temperature-medium";
    }
    return "weather-temperature-low";
  }

  return (
    <section className="weather-section">
      <div className="weather-first-division">
        <div className="weather-second-division">{conditionPicture()}</div>
        <div className="weather-second-division">
          <FaTemperatureLow className={temperatureIconColor()} />
          {`${temperature} °C`}
        </div>
        <div className="weather-second-division">
          <WiHumidity className="weather-humidity-icon" />
          {`${humidity} %`}
        </div>
        <div className="weather-second-division">
          <BsWind className="weather-wind" />
          {`${wind} km/h`}
        </div>
        <div className="weather-second-division">
          <WiWindDeg className="weather-wind-direction-icon" />
          {windDirection}
        </div>
        <div className="weather-second-division">
          <div className="weather-lunar-icon">{lunarIcon()}</div>
          <div className="text-white">{`${illumination} %`}</div>
        </div>
      </div>
      <div className="weather-first-division">
        <div className="weather-third-division">
          <BsSunrise className="weather-sunrise-icon" />
          {sunrise}
        </div>
        <div className="weather-third-division">
          <BsSunset className="weather-sunset-icon" />
          {sunset}
        </div>
        <div className="weather-third-division">
          <WiMoonrise className="weather-moonrise-icon" />
          {moonrise}
        </div>
        <div className="weather-third-division">
          <WiMoonset className="weather-moonrise-icon" />
          {moonset}
        </div>
      </div>
    </section>
    // <>
    //   <section className="weather-first-section">
    //     <div className="text-white flex items-center gap-4">
    //       {conditionPicture()}

    //     </div>
  );
}

export default Weather;
