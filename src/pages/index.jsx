// src/pages/index.tsx
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOwnerName } from "../components/add-card-form/addCardSlice";
import { useEffect } from "react";

export default function Home() {
  let dispatch = useDispatch();
  const ownerName = useSelector((state) => state.cardInfo.cards);
  const isOwnerNameFetched = useSelector((state) => state.cardInfo.status === "Success!");

  useEffect(() => {
    if (!isOwnerNameFetched) {
      dispatch(getOwnerName());
    }
  }, [dispatch, isOwnerNameFetched]);
  console.log(ownerName);

  return (
    <div className="h-full">
      <div className="flex flex-col items-center justify-center h-5/6 w-full">
        <h1 className="text-2xl font-bold">Welcome to your E-Wallet</h1>
        <span className="text-xs">ADD LOADER HERE AND THEN SEND TO /cards</span>
        <div className="p-2 mt-2">
          <Link
            to="/cards"
            className="bg-gray-200 shadow-lg shadow-black-500/40 hover:bg-gray-700 font-semibold py-2 px-2 rounded text-blue-500 hover:underline"
          >
            go to /cards
          </Link>
        </div>
      </div>
    </div>
  );
}
