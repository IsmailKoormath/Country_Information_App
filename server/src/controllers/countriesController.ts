import axios from "axios";
import { NextFunction, Request, Response } from "express";

//---------fiter with country code ------------

export const filterWithCountryCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.params;
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/alpha/${code}`
    );
    const countries = response.data;

    if (countries) {
      const filteredCountries = countries.map((country: any) => ({
        name: country.name,
        flags: country.flags,
        flag: country.flag,
        currency: country.currencies,
        languages: country.languages,
        population: country.population,
        region: country.region,
        timezones: country.timezones,
      }));

      res.status(200).json(filteredCountries);
    } else {
      res.status(400).json({ message: "Invalid country code" });
    }
  } catch (error) {
    next(error);
  }
};

//---------fiter with region ------------

export const filterWithRegion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { region } = req.params;
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/region/${region}`
    );
    const countries = response.data;

    if (countries) {
      const filteredCountries = countries.map((country: any) => ({
        name: country.name,
        flags: country.flags,
        flag: country.flag,
        region: country.region,
        timezones: country.timezones,
      }));

      res.status(200).json(filteredCountries);
    } else {
      res.status(400).json({ message: "Invalid region" });
    }
  } catch (error) {
    next(error);
  }
};

//------ search countries with Capita , Region and Timezone ---------

export const allCountriesWithSearch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { capital, region, timezone } = req.query;
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    console.log("====================================");
    console.log(response);
    console.log("====================================");
    const countries = response.data;
    console.log("====================================");
    console.log(countries);
    console.log("====================================");
    const results = countries
      .filter((country: any) => {
        const countryCapital = country.capital
          ? country.capital[0].toLowerCase()
          : "";
        const countryRegion = country.region
          ? country.region.toLowerCase()
          : "";
        const countryTimezones = country.timezones
          ? country.timezones.map((tz: any) => tz.toLowerCase())
          : [];

        return (
          (!capital ||
            countryCapital.includes((capital as string).toLowerCase())) &&
          (!region ||
            countryRegion.includes((region as string).toLowerCase())) &&
          (!timezone ||
            countryTimezones.some((tz: any) =>
              tz.includes((timezone as string).toLowerCase())
            ))
        );
      })
      .map((country: any) => ({
        name: country.name,
        flags: country.flags,
        flag: country.flag,
        region: country.region,
        timezones: country.timezones,
      }));

    res.json({
      success: true,
      results,
      count: results.length,
    });
  } catch (error:any) {
    next(error);
  }
};
