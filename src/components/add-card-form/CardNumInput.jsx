import { useState } from "react";

const CreditCardInput = () => {
  const [cardNumber, setCardNumber] = useState("");

  const formatCreditCardNumber = (inputValue) => {
    // Remove any non-numeric characters from the input
    const numericValue = inputValue.replace(/\D/g, "");

    // Format the numeric value into groups of 4 digits each
    let formattedValue = "";
    for (let i = 0; i < numericValue.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " ";
      }
      formattedValue += numericValue[i];
    }

    return formattedValue;
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatCreditCardNumber(inputValue);
    setCardNumber(formattedValue);
  };

  return (
    <div>
      <input
        type="text"
        name="floating_cardNumber"
        id="floating_cardNumber"
        value={cardNumber}
        onChange={handleInputChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        maxLength="19" // 16 digits + 3 spaces
        required
      />
      <label
        htmlFor="floating_cardNumber"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Card Number
      </label>
    </div>
  );
};

export default CreditCardInput;
