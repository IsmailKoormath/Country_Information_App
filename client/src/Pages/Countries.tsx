import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import {
  getAllCountries,
  getCountriesWithRegionApi,
} from "../services/CountryApis";

type Region = "Africa" | "Americas" | "Asia" | "Europe" | "Oceania" | "";

const Countries: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterRegion, setFilterRegion] = useState<Region>("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const regions: Region[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await getAllCountries();
        setCountries(response?.data);
      } catch (error) {
        console.error("Failed to fetch countries", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, [searchQuery]);

  const handleFilter = () => {
    try {
      setLoading(true);
      const response: any = getCountriesWithRegionApi(filterRegion);
      setCountries(response?.data);
    } catch (error) {
      console.error("Failed to fetch countries", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleFilter();
  }, [filterRegion]);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setFilterRegion(event.target.value as Region);
  };

  return (
    <div className="w-full min-h-screen p-10 bg-gray-100">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          <span className="ml-4 text-lg text-gray-600">Loading...</span>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Explore Countries
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 ml-auto w-full">
            <input
              type="text"
              placeholder="Search for a country..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={filterRegion}
              onChange={handleFilterChange}
              className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Filter by Region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {countries.map((country) => (
              <Card country={country} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Countries;
