import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudRainWind,
  CloudSnow,
  CloudSun,
  CloudyIcon,
  Compass,
  Droplets,
  Moon,
  Snowflake,
  SnowflakeIcon,
  Sun,
  SunMedium,
  Sunrise,
  Sunset,
  Thermometer,
  Wind,
  Zap,
} from "lucide-react";

import "./Weather.css";

function Weather() {
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [moonrise, setMoonrise] = useState();
  const [moonset, setMoonset] = useState();
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
        return <Sun size={28} strokeWidth={1} color="yellow" />;

      case "Partly cloudy":
        return <CloudSun size={28} strokeWidth={1} color="grey" />;

      case "Cloudy":
        return <Cloud size={28} strokeWidth={1} color="grey" />;

      case "Overcast":
        return <CloudyIcon size={28} strokeWidth={1} color="black" />;

      case "Mist":
      case "Fog":
        return <CloudFog size={28} strokeWidth={1} color="white" />;

      // rain
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
        return <CloudRainWind size={28} color="grey" strokeWidth={1} />;

      // snow
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
      case "Patchy sleet possible":
      case "Blowing snow":
        return <Snowflake size={28} color="white" strokeWidth={1} />;

      // freeze
      case "Patchy freezing drizzle possible":
      case "Freezing fog":
      case "Freezing drizzle":
      case "Heavy freezing drizzle":
        return <SnowflakeIcon size={28} color="lightblue" strokeWidth={1} />;

      // thunder
      case "Thundery outbreaks possible":
      case "patchy light rain with thunder":
      case "moderate or heavy rain with thunder":
      case "patchy light snow with thunder":
      case "moderate or heavy snow with thunder":
        return <Zap size={28} color="yellow" strokeWidth={1} />;

      // blizzard
      case "Blizzard":
        return <CloudSnow size={28} color="white" strokeWidth={1} />;

      // drizzle
      case "Patchy light drizzle":
      case "Light drizzle":
        return <CloudDrizzle size={28} color="white" strokeWidth={1} />;

      default:
        return <SunMedium size={28} color="yellow" strokeWidth={1} />;
    }
  };

  function temperatureIconColor() {
    if (temperature > "28") {
      return <Thermometer size={28} strokeWidth={1} color="red" />;
    }
    if (temperature < "28" && temperature >= "20") {
      return <Thermometer size={28} strokeWidth={1} color="yellow" />;
    }
    return <Thermometer size={28} strokeWidth={1} color="blue" />;
  }

  return (
    <section className="flex flex-col items-center max-h-[20vh] text-[0.7rem]">
      <div className="flex gap-4">
        <div className="flex flex-col items-center text-white">
          {conditionPicture()}
        </div>
        <div className="flex-col items-center text-white">
          {temperatureIconColor()}
          {`${temperature} °C`}
        </div>
        <div className="flex flex-col items-center text-white">
          <Droplets size={28} color="lightblue" strokeWidth={1} />
          {`${humidity} %`}
        </div>
        <div className="flex flex-col items-center text-white">
          <Wind size={28} color="white" strokeWidth={1} />
          {`${wind} km/h`}
        </div>
        <div className="flex flex-col items-center text-white">
          <Compass size={28} color="white" strokeWidth={1} />
          {windDirection}
        </div>
        <div className="flex flex-col items-center text-white">
          <Moon size={28} color="white" strokeWidth={1} />
          <div>{`${illumination} %`}</div>
        </div>
      </div>
      <div className="flex gap-4 mt-3">
        <div className="flex items-center text-white gap-2">
          <Sunrise size={28} color="yellow" strokeWidth={1} />
          {sunrise}
        </div>
        <div className="flex items-center text-white gap-2">
          <Sunset size={28} color="orange" strokeWidth={1} />
          {sunset}
        </div>
        <div className="flex items-center text-white gap-2">
          <Sunrise size={28} color="grey" strokeWidth={1} />
          {moonrise}
        </div>
        <div className="flex items-center text-white gap-2">
          <Sunset size={28} color="grey" strokeWidth={1} />
          {moonset}
        </div>
      </div>
    </section>
  );
}

export default Weather;
