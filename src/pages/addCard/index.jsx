// src/pages/index.tsx
import AddCardForm from "../../components/add-card-form/AddCardForm";
import CreditCard from "../../components/CreditCard";
import { Link } from "react-router-dom";

export default function AddCard() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="mb-8">
        <Link
          to={"/cards"}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Go Back
        </Link>
      </div>
      <div className="mb-8">
        <CreditCard cardDb="newCard" home={false} newCard={true} />
      </div>
      <div className="flex justify-center items-center w-full mb-24">
        <AddCardForm />
      </div>
    </div>
  );
}
