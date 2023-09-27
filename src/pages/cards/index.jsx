import { Link } from "react-router-dom";
import CreditCard from "../../components/CreditCard";
import CardList from "../../components/CardList";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function Cards() {
  const cardsArr = useSelector((state) => state.cardInfo.cards);
  const activeCard = useSelector((state) => state.cardInfo.activeCard);

  const [showMaxCardsMessage, setShowMaxCardsMessage] = useState(false);
  const [currentActiveCard, setCurrentActiveCard] = useState(activeCard);

  const navigate = useNavigate();
  const handleAddCard = () => {
    if (cardsArr.length >= 4) {
      setShowMaxCardsMessage(true);
    } else {
      setShowMaxCardsMessage(false);
      navigate("/addcard");
    }
  };

  useEffect(() => {
    if (cardsArr.length < 4) {
      setShowMaxCardsMessage(false);
    } else {
      setShowMaxCardsMessage(true);
    }
  }, [cardsArr, setShowMaxCardsMessage]);

  useEffect(() => {
    setCurrentActiveCard(activeCard);
  }, [activeCard]);

  return (
    <div className="flex flex-col items-center h-full w-full">
      <div className="mb-8">
        <Link
          to={"/"}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Go Back
        </Link>
      </div>
      <div id="card">
        <p className="text-xs font-light text-center mb-4 bg-">Active Card</p>
        <CreditCard
          cardDb="cards"
          newCard={false}
          home={true}
          activeCard={currentActiveCard}
          key={currentActiveCard?.number}
        />
      </div>
      <div id="allCards" className="mt-12 w-full h-fit flex flex-wrap justify-center">
        <CardList />
      </div>
      <div id="addCardBtn" className="w-full">
        <div className="flex flex-col justify-center items-center">
          {!showMaxCardsMessage ? (
            <button
              type="button"
              className="mt-12 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
              onClick={handleAddCard}
            >
              Add New Card
            </button>
          ) : (
            <p className="text-xs font-semibold mt-20 italic">
              Maximum number of cards reached
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
