import { axiosApi } from "../config/axiosConfig";
type Country = {
  name?: string;
  region?: string;
  capital?: string;
  timezone?: string;
};

export const getAllCountries = async ({
  name = "",
  region = "",
  capital = "",
  timezone = "",
}: Country = {}) => {
  const res = await axiosApi.get(
    `/countries?name=${name}&region=${region}&capital=${capital}&timezone=${timezone}`
  );
  return res;
};

export const getCountriesWithRegionApi = async (region: string) => {
  const res = await axiosApi.get(`/countries/region/${region}`);
  return res;
};

export const getCountryDetails = async (code: string | undefined) => {
  const res = await axiosApi.get(`/countries/${code}`);
  return res;
};
