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
  WiMoonAltWaxingGibbous2,
  WiMoonFull,
  WiMoonNew,
  WiMoonrise,
  WiMoonset,
  WiWindDeg,
  WiThunderstorm,
  WiMoonWaxingCrescent1,
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
        return <BsSun className="classWeatherCondition" />;
      case "Partly cloudy":
        return <BsCloudSun className="classWeatherCondition" />;
      case "Cloudy":
      case "Overcast":
        return <AiOutlineCloud className="classWeatherCondition" />;
      case "Mist":
        return <RiMistFill className="classWeatherCondition" />;
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
        return <FaCloudSunRain className="classWeatherCondition" />;
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
        return <WiDaySnow className="classWeatherCondition" />;
      case "Patchy sleet possible":
        return <WiDaySnow className="classWeatherCondition" />;
      case "Patchy freezing drizzle possible":
        return <BsThermometerSnow className="classWeatherCondition" />;
      case "Thundery outbreaks possible":
        return <WiDayThunderstorm className="classWeatherCondition" />;
      case "Blowing snow":
        return <BsCloudSnow className="classWeatherCondition" />;
      case "Blizzard":
        return <RiCloudWindyLine className="classWeatherCondition" />;
      case "Fog":
      case "Freezing fog":
        return <BsCloudFog className="classWeatherCondition" />;
      case "Patchy light drizzle":
      case "Light drizzle":
        return <BsCloudRain className="classWeatherCondition" />;
      case "Freezing drizzle":
      case "Heavy freezing drizzle":
        return <BiCloudRain className="classWeatherCondition" />;
      case "Patchy light rain with thunder":
      case "Moderate or heavy rain with thunder":
        return <WiThunderstorm className="classWeatherCondition" />;
      case "Patchy light snow with thunder":
      case "Moderate or heavy snow with thunder":
        return <WiDaySnowThunderstorm className="classWeatherCondition" />;
      default:
        return <BsSun className="classWeatherCondition" />;
    }
  };

  const lunarIcon = () => {
    switch (moonphase) {
      case "New Moon":
        return <WiMoonNew className="classWeatherMoonIcon" />;
      case "First Quarter":
        return <WiMoonAltFirstQuarter className="classWeatherMoonIcon" />;
      case "Last Quarter":
        return <WiMoonAltThirdQuarter className="classWeatherMoonIcon" />;
      case "Waxing Crescent":
        return <WiMoonWaxingCrescent1 className="classWeatherMoonIcon" />;
      case "Waning Crescent":
        return <WiMoonAltWaningCrescent5 className="classWeatherMoonIcon" />;
      case "Waxing Gibbous":
        return <WiMoonAltWaxingGibbous2 className="classWeatherMoonIcon" />;
      case "Waning Gibbous":
        return <WiMoonAltWaningGibbous2 className="classWeatherMoonIcon" />;
      default:
        return <WiMoonFull className="classWeatherMoonIcon" />;
    }
  };

  function temperatureIconColor() {
    if (temperature > "28") {
      return "classWeatherTemperatureHot";
    }
    if (temperature < "28" && temperature >= "20") {
      return "classWeatherTemperatureMedium";
    }
    return "classWeatherTemperatureLow";
  }

  return (
    <section className="flex flex-col items-center max-h-[20vh] text-[0.7rem]">
      <div className="flex gap-4">
        <div className="flex flex-col items-center text-white">
          {conditionPicture()}
        </div>
        <div className="flex flex-col items-center text-white">
          <FaTemperatureLow className={temperatureIconColor()} />
          {`${temperature} °C`}
        </div>
        <div className="flex flex-col items-center text-white">
          <WiHumidity className="classWeatherHumidityIcon" />
          {`${humidity} %`}
        </div>
        <div className="flex flex-col items-center text-white">
          <BsWind className="classWeatherWindIcon" />
          {`${wind} km/h`}
        </div>
        <div className="flex flex-col items-center text-white">
          <WiWindDeg className="classWeatherWindDirectionIcon" />
          {windDirection}
        </div>
        <div className="flex flex-col items-center text-white">
          <div className="classWeatherLunarIcon">{lunarIcon()}</div>
          <div>{`${illumination} %`}</div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center text-white gap-2">
          <BsSunrise className="classWeatherSunriseIcon" />
          {sunrise}
        </div>
        <div className="flex items-center text-white gap-2">
          <BsSunset className="classWeatherSunsetIcon" />
          {sunset}
        </div>
        <div className="flex items-center text-white gap-2">
          <WiMoonrise className="classWeatherMoonriseIcon" />
          {moonrise}
        </div>
        <div className="flex items-center text-white gap-2">
          <WiMoonset className="classWeatherMoonsetIcon" />
          {moonset}
        </div>
      </div>
    </section>
  );
}

export default Weather;
