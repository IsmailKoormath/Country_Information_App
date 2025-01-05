import { useEffect, useState } from "react";
import { getCountryDetails } from "../services/CountryApis";
import { useParams } from "react-router-dom";

const CountryDetails = () => {
  const params = useParams();
  const [details, setDetails]: any = useState({});
  const code = params.code;
  useEffect(() => {
    const fetchCountyDetails = async () => {
      try {
        const response = await getCountryDetails(code);
        setDetails(response?.data);
      } catch (error) {
        console.error("Failed to fetch countries", error);
      }
    };
    fetchCountyDetails();
  }, []);
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      {/* Country Name */}
      <h1 className="text-3xl font-bold text-center text-gray-800">
        {details.name.common}
      </h1>
      <h2 className="text-lg text-center text-gray-600 mt-2">
        {details.name.official}
      </h2>

      {/* Country Flag */}
      <img
        src={`https://flagcdn.com/w320/${details.cca2.toLowerCase()}.png`}
        alt={`Flag of ${details.name.common}`}
        className="w-full mt-6 rounded-lg"
      />

      {/* Country Information */}
      <div className="mt-6 space-y-4">
        <p className="text-gray-700">
          <span className="font-medium">Region:</span> {details.region}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Subregion:</span> {details.subregion}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Capital:</span> {details.capital[0]}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Population:</span>{" "}
          {details.population.toLocaleString()}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Languages:</span>{" "}
          {Object.values(details.languages).join(", ")}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Currency:</span>{" "}
          {details.currencies.name} ({details.currencies.symbol})
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Gini (2018):</span>{" "}
          {details.gini["2018"]}
        </p>
      </div>

      {/* Map Links */}
      <div className="mt-6 flex space-x-4">
        <a
          href={details.maps.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Google Maps
        </a>
        <a
          href={details.maps.openStreetMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          OpenStreetMap
        </a>
      </div>
    </div>
  );
};

export default CountryDetails;
