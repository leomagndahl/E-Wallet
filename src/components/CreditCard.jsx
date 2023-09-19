import React, { useState } from "react";
import PropTypes from "prop-types";

const CreditCard = ({ color, shadowSize }) => {
  const [creditCardDetails, setCreditCardDetails] = useState(defaultData);
  const [error, setError] = useState({
    number: false,
    expiryDate: false,
    cvv: false,
  });
  return (
    <div className="flex flex-col justify-center items-center bg-transparent min-h-scree">
      <div className="flex flex-col justify-center items-center">
        <div className="flex md:flex-row flex-col items-center justify-center md:gap-20 gap-12">
          <div className="flex flex-col">
            {(error.expiryDate || error.number) && (
              <div className="sm:text-sm text-xs text-red-600 h-9">
                {error.expiryDate
                  ? "Please enter valid expiry date"
                  : "Please enter valid card number"}
              </div>
            )}
            <div
              className={`flex flex-col justify-between ${color} h-48 lg:w-80 w-80 rounded-lg px-7 py-5 transition duration-400 shadow-${shadowSize} hover:scale-105 md:hover:scale-110 sample1`}
            >
              <div className="flex justify-between leading-4 items-center">
                <span className="sm:text-sm text-xs font-medium">Credit Card</span>
                <MasterCard />
              </div>
              <div className="flex">
                <span className="flex items-center text-base top-3">
                  <LeftCaret />
                  <input
                    className="bg-transparent focus:outline-none border border-transparent  focus:border-black rounded-md px-1"
                    type="text"
                    value={cc_format(creditCardDetails?.number)}
                    onChange={(e) => {
                      const { value } = e.target;
                      let finalValue = value.replaceAll(" ", "");
                      isNaN(finalValue)
                        ? setError({ ...error, number: true })
                        : finalValue.length < 16
                        ? setError({ ...error, number: true })
                        : setError({ ...error, number: false });
                      setCreditCardDetails({
                        ...creditCardDetails,
                        number: value,
                      });
                    }}
                  />
                </span>
              </div>
              <div className="flex justify-between sm:text-sm text-xs font-bold text-gradient-to-r from-black to-gray-200 gap-1">
                <span className="w-4/6">
                  <input
                    className="bg-transparent focus:outline-none border border-transparent focus:border-black rounded-md px-1 w-full"
                    type="text"
                    value={creditCardDetails?.ownerName}
                    maxLength="21"
                    onChange={(e) =>
                      setCreditCardDetails({
                        ...creditCardDetails,
                        ownerName: e?.target?.value,
                      })
                    }
                  />
                </span>
                <span>
                  <input
                    className="bg-transparent focus:outline-none border border-transparent focus:border-black rounded-md  w-12"
                    type="text"
                    value={cc_expires_format(creditCardDetails?.expiryDate)}
                    maxLength="5"
                    onChange={(e) => {
                      const { value } = e?.target;
                      value.match(/^(0[1-9]|1[0-2])\/(([0-9]{4}|[0-9]{2})$)/)
                        ? value.slice(-2) < currentYear.slice(-2)
                          ? setError({ ...error, expiryDate: true })
                          : value.slice(-2) === currentYear.slice(-2) &&
                            value.slice(0, 2) <= currentMonth
                          ? setError({ ...error, expiryDate: true })
                          : setError({ ...error, expiryDate: false })
                        : setError({ ...error, expiryDate: true });
                      setCreditCardDetails({
                        ...creditCardDetails,
                        expiryDate: value,
                      });
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
CreditCard.propTypes = {
  color: PropTypes.string.isRequired, // Ensure that color is a required string prop
  shadowSize: PropTypes.string.isRequired, // Ensure that color is a required string prop
};

export default CreditCard;
const defaultData = {
  number: "1234567812345678",
  ownerName: "John John",
  expiryDate: "06/29",
  cvv: "133",
};
function cc_format(value) {
  var v = value
    .replace(/\s+/g, "")
    .replace(/[^0-9]/gi, "")
    .replace(/\D/g, "");
  var matches = v.match(/\d{4,16}/g);
  var match = (matches && matches[0]) || "";
  var parts = [];
  let len, i;
  for (i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join("  ");
  } else {
    return v;
  }
}
function cc_expires_format(string) {
  return string
    .replace(
      /[^0-9]/g,
      "" // To allow only numbers
    )
    .replace(
      /^([2-9])$/g,
      "0$1" // To handle 3 > 03
    )
    .replace(
      /^(1{1})([3-9]{1})$/g,
      "0$1/$2" // 13 > 01/3
    )
    .replace(
      /^0{1,}/g,
      "0" // To handle 00 > 0
    )
    .replace(
      /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
      "$1/$2" // To handle 113 > 11/3
    );
}
let currentYear = new Date().getFullYear().toString();
let currentMonth = ("0" + (new Date().getMonth() + 1)).slice(-2);
const MasterCard = () => {
  return (
    <div>
      <svg
        height="618.03101"
        viewBox="0 0 1000.008 618.03103"
        width="1000.008"
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
      >
        <g>
          <g>
            <path
              d="M503.655,35.399l-0.05-14.37c0-3.534-2.207-6.69-5.531-7.898c-3.307-1.192-7.042-0.193-9.308,2.518
			c-19.297,23.157-36.604,41.917-64.747,54.222c-18.163-9.955-39.416-15.268-62.842-15.268c-50.889,0-88.341,19.313-109.375,56.119
			c-21.034-36.805-58.486-56.119-109.367-56.119c-23.418,0-44.645,5.305-62.8,15.242C51.508,57.541,34.209,38.79,14.938,15.649
			c-2.275-2.711-5.993-3.71-9.317-2.518C2.306,14.34,0.09,17.496,0.09,21.029L0.04,35.407
			c-0.201,44.502-0.352,86.595,18.709,123.963c-8.184,48.027,7.923,100.763,45.081,141.824
			c30.485,33.683,180.526,185.873,182.003,187.367c1.578,1.603,3.727,2.501,5.968,2.501c2.249,0,4.398-0.898,5.968-2.501
			c1.486-1.494,151.527-153.684,182.012-187.367c37.124-41.027,53.223-93.704,45.098-141.69
			C504.007,122.103,503.865,79.96,503.655,35.399z M28.695,126.174c-1.016,2.291-1.863,4.633-2.745,6.958
			c-8.746-26.901-9.258-56.614-9.157-89.676C30.097,57.994,44.416,70.819,63.31,80.748C48.739,92.39,36.929,107.641,28.695,126.174z
			 M477.408,132.502c-0.823-2.115-1.57-4.247-2.501-6.329c-8.217-18.516-20.01-33.758-34.573-45.4
			c18.919-9.929,33.255-22.763,46.567-37.317c0.109,33.087-0.411,62.825-9.182,89.743
			C477.635,132.964,477.501,132.746,477.408,132.502z"
            />
          </g>
        </g>
      </svg>
      <div>
        <svg
          height="618.03101"
          viewBox="0 0 1000.008 618.03103"
          width="1000.008"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-12 hidden"
        >
          <g transform="matrix(8.5837610323 0 0 8.5837610323 -2898.73609385976 -2239.50304064073)">
            <path d="m380.20001 268.60001h31.5v56.599998h-31.5z" fill="#ff5f00" />
            <path
              d="m382.2 296.9c0-11.5 5.4-21.7 13.7-28.3-6.1-4.8-13.8-7.7-22.2-7.7-19.9 0-36 16.1-36 36s16.1 36 36 36c8.4 0 16.1-2.9 22.2-7.7-8.3-6.5-13.7-16.8-13.7-28.3z"
              fill="#eb001b"
            />
            <path
              d="m454.2 296.9c0 19.9-16.1 36-36 36-8.4 0-16.1-2.9-22.2-7.7 8.4-6.6 13.7-16.8 13.7-28.3s-5.4-21.7-13.7-28.3c6.1-4.8 13.8-7.7 22.2-7.7 19.9 0 36 16.2 36 36z"
              fill="#f79e1b"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};
const LeftCaret = () => {
  return (
    <svg
      width="13"
      height="15"
      viewBox="0 0 13 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-xl mr-1"
    >
      <path
        d="M12.5655 0.785121L12.701 14.4904L0.764073 7.75511L12.5655 0.785121Z"
        fill="#000000"
      />
    </svg>
  );
};
