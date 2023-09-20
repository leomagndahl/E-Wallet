import { configureStore } from "@reduxjs/toolkit";
import addCardSlice from "../components/add-card-form/addCardSlice";

const store = configureStore({
  reducer: {
    cardInfo: addCardSlice,
  },
});

export default store;
