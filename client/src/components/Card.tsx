import { Link } from "react-router-dom";

const Card = ({ country }: any) => {
  return (
    <>
      <Link to={`/${country?.cca2}`}></Link>
      <div className="w-52 h-60 border rounded-md p-4">
        <img
          className="w-full h-auto"
          src="data:image/png;base64,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"
          alt="flag"
        />
        <h4 className="font-bold mt-3">{country?.name}Name</h4>
        <p className="text-gray-700 font-semibold">Region</p>
      </div>
    </>
  );
};

export default Card;
