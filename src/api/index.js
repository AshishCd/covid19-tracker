import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changableUrl = url;
  if (country) {
    changableUrl = `${url}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changableUrl);
    const modifiedData = {
      confirmed: confirmed,
      recovered: recovered,
      deaths: deaths,
      lastUpdate: lastUpdate,
    };
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const response = await axios.get(`${url}/daily`);
    const { data } = response;
    const modifiedData = data.map((dailyData) => {
      return {
        confirmed: dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate,
      };
    });
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const response = await axios.get(`${url}/countries`);
    const { data } = response;
    const { countries } = data;
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
