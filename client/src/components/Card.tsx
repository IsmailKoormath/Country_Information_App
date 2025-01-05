import { Link } from "react-router-dom";

const Card = ({ country }: any) => {
  return (
    <>
      <Link to={`/${country?.cca2}`}></Link>
      <div className="w-52 h-60 border rounded-md p-4">
        <img
          className="w-full h-auto"
          src={country.flags.png}
          alt="flag"
        />
        <h4 className="font-bold mt-3">Name : {country?.name}</h4>
        <p className="text-gray-700 font-semibold">
          Region : {country?.region}
        </p>
      </div>
    </>
  );
};

export default Card;
