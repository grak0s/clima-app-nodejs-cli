require("dotenv").config();

const axios = require("axios");

class Busquedas {
  historial = ["madrid"];

  constructor() {}

  async ciudad(lugar = "") {
    //  console.log(lugar);
    try {
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: {
          access_token: process.env.MAPBOX_KEY,
          limit: 5,
          lenguaje: "es",
        },
      });

      const resp = await intance.get();
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      const intance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          lat,
          lon,
          appid: process.env.OPENWEATHER_KEY,
          units: "metric",
          lang: "es",
        },
      });
      const resp = await intance.get();
      const { weather, main } = resp.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Busquedas;
