export const validateForm = (formData, currentYear, currentMonth) => {
  const { number, expiryDate, cvv, chooseVendor } = formData;
  const errors = {};

  // Validate card number
  if (!/^\d{16}$/.test(number)) {
    errors.number = "Please input a correct credit card number.";
  }

  // Validate expiry date
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
    errors.expiryDate = "Please input a valid expiry date in the format MM/YY.";
  } else {
    const [month, year] = expiryDate.split("/");
    const currentYearLastTwoDigits = currentYear.slice(-2);

    if (
      year < currentYearLastTwoDigits ||
      (year === currentYearLastTwoDigits && month <= currentMonth)
    ) {
      errors.expiryDate = "Expiry date has already passed.";
    }
  }

  // Validate CVV
  if (!/^\d{3}$/.test(cvv)) {
    errors.cvv = "Please input a valid CVV code.";
  }

  // Validate Vendor
  if (chooseVendor === "") {
    errors.chooseVendor = "Please choose a vendor.";
  }

  return errors;
};
