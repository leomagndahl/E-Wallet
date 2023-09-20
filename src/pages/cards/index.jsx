// src/pages/index.tsx
import { Link } from "react-router-dom";
import CreditCard from "../../components/CreditCard";
import CardList from "../../components/CardList";
export default function Cards() {
  return (
    <div className="flex flex-col items-center h-full w-full">
      <div className="mb-8">
        <Link
          to={"/"}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Go Back
        </Link>
      </div>
      <div id="card">
        <p className="text-xs font-light text-center mb-4 bg-">Active Card</p>
        <CreditCard
          color="bg-amber-500"
          cardDb="cards"
          newCard={false}
          displayCard={true}
        />
      </div>
      <div id="allCards" className="mt-12 w-full h-fit flex flex-wrap justify-center">
        {/* Gör så att när du väljer ett kort så ska det tas bort från listan och om du väljer ett nytt läggs det gamla tillbak
        På det här sättet går det aldrig att radera ett kort som är aktivt */}
        <CardList />
      </div>
      <div id="addCardBtn" className="w-full">
        <div className="flex justify-center">
          <Link to="/addCard">
            {" "}
            <button
              type="button"
              className="mt-12 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
            >
              Add New Card
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
