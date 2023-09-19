import { useState } from "react";
const DateInput = () => {
  const [date, setDate] = useState("");

  const formatDate = (inputValue) => {
    // Remove any non-numeric characters from the input
    const numericValue = inputValue.replace(/\D/g, "");

    // Format the numeric value into groups of 2 digits each
    let formattedValue = "";
    for (let i = 0; i < numericValue.length; i++) {
      if (i > 0 && i % 2 === 0) {
        formattedValue += "/";
      }
      formattedValue += numericValue[i];
    }

    return formattedValue;
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatDate(inputValue);
    setDate(formattedValue);
  };

  return (
    <div>
      <div>
        <input
          value={date}
          onChange={handleInputChange}
          type="text"
          name="floating_valid_thru"
          id="floating_valid_thru"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          maxLength="5"
          required
        />
        <label
          htmlFor="floating_valid_thru"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Valid Thru (YY/MM)
        </label>
      </div>
    </div>
  );
};

export default DateInput;
