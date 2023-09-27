import {
  cc_format,
  cc_expires_format,
  currentMonth,
  currentYear,
} from "../../functions/creditCard";
import {
  addCard,
  setNumber,
  setExpiryDate,
  setCvv,
  setVendor,
  resetNewCard,
  setActiveCard,
} from "./addCardSlice";
import { validateForm } from "../../functions/addCardFormFunc";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddCardForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let newCard = useSelector((state) => state.cardInfo.newCard);

  const [creditCardDetails, setCreditCardDetails] = useState(newCard);

  useEffect(() => {
    setCreditCardDetails(newCard);
  }, [newCard]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(creditCardDetails, currentYear, currentMonth);

    if (Object.keys(errors).length === 0) {
      dispatch(addCard(creditCardDetails));
      dispatch(setActiveCard(creditCardDetails));
      dispatch(resetNewCard());
      setCreditCardDetails(newCard);
      navigate("/cards");
    } else {
      alert(Object.values(errors).join("\n"));
    }
  };

  return (
    <form className="w-11/12 bg-white shadow-xl p-8 rounded">
      <div className="relative z-10 w-full mb-6 group">
        <div>
          <input
            type="text"
            name="floating_cardNumber"
            id="floating_cardNumber"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            maxLength={19}
            value={cc_format(creditCardDetails?.number)}
            onChange={(e) => {
              const { value } = e.target;
              let finalValue = value.replaceAll(" ", "");
              dispatch(setNumber(finalValue));
            }}
          />
          <label
            htmlFor="floating_cardNumber"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Card Number
          </label>
        </div>
      </div>
      <div className="relative z-10 w-full mb-6 group">
        <input
          type="text"
          name="floating_cardName"
          id="floating_cardName"
          className="cursor-not-allowed block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          defaultValue={creditCardDetails?.ownerName}
          required
          disabled
        />
        <label
          htmlFor="floating_cardName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-20 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Card Holder Name
        </label>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="relative z-10 w-full mb-6 group">
          <div>
            <div>
              <input
                type="text"
                name="floating_valid_thru"
                id="floating_valid_thru"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                maxLength="5"
                required
                value={cc_expires_format(creditCardDetails?.expiryDate)}
                onChange={(e) => {
                  const { value } = e.target;
                  dispatch(setExpiryDate(value));
                }}
              />
              <label
                htmlFor="floating_valid_thru"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Valid Thru (YY/MM)
              </label>
            </div>
          </div>
        </div>
        <div className="relative z-10 w-full mb-6 group">
          <input
            type="text"
            name="floating_last_name"
            id="floating_last_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            maxLength={3}
            inputMode="numeric"
            required
            onChange={(e) => {
              const { value } = e.target;
              dispatch(setCvv(value));
            }}
          />
          <label
            htmlFor="floating_last_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-20 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            CVV
          </label>
        </div>
      </div>
      <div className="relative z-10 w-full mb-6 group">
        <label
          htmlFor="underline_select"
          className="sr-only peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-20 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Choose Vendor
        </label>
        <select
          id="underline_select"
          className="block py-2.5 px-0 w-full text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          onChange={(e) => {
            const { value } = e.target;
            dispatch(setVendor(value));
          }}
        >
          <option value="">Choose a Vendor</option>
          <option value="BigBank">BigBank</option>
          <option value="VISA">VISA</option>
          <option value="Mastercard">Mastercard</option>
        </select>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
}

export default AddCardForm;
