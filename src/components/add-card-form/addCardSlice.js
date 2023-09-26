import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getOwnerName = createAsyncThunk("addCardSlice/getOwnerName", async () => {
  let res = await axios.get("https://randomuser.me/api/");
  let data = res.data.results[0];
  let name = `${data.name.first} ${data.name.last}`;
  return name;
});

const initialOwnerName = localStorage.getItem("ownerName");

const addCardSlice = createSlice({
  name: "add-card",
  initialState: {
    status: "",
    cards: JSON.parse(localStorage.getItem("cards")) || [
      {
        number: "12345678123456789",
        ownerName: initialOwnerName || "",
        expiryDate: "06/29",
        cvv: "133",
        chooseVendor: "BigBank",
      },
    ],
    newCard: {
      number: "",
      ownerName: initialOwnerName || "",
      expiryDate: "",
      cvv: "",
      chooseVendor: "",
    },
  },
  reducers: {
    addCard: (state, action) => {
      let card = action.payload;
      console.log("cardSlice: ", card);
      state.cards.push(card);
      localStorage.setItem("cards", JSON.stringify(state.cards)); // Save to local storage
    },
    setNumber: (state, action) => {
      state.newCard.number = action.payload;
    },
    setOwnerName: (state, action) => {
      state.newCard.ownerName = action.payload;
    },
    setExpiryDate: (state, action) => {
      state.newCard.expiryDate = action.payload;
    },
    setCvv: (state, action) => {
      state.newCard.cvv = action.payload;
    },
    setVendor: (state, action) => {
      state.newCard.chooseVendor = action.payload;
    },
    deleteCard: (state, action) => {
      const updatedCards = state.cards.filter((card) => card.number !== action.payload);
      localStorage.setItem("cards", JSON.stringify(updatedCards));

      return {
        ...state,
        cards: updatedCards,
      };
    },
    resetNewCard: (state) => {
      return {
        ...state,
        newCard: {
          number: "",
          ownerName: initialOwnerName || "",
          expiryDate: "",
          cvv: "",
          chooseVendor: "",
        },
      };
    },
  },
  extraReducers: {
    [getOwnerName.pending]: (state) => {
      state.status = "Loading";
    },
    [getOwnerName.fulfilled]: (state, action) => {
      state.status = "Success!";
      const newName = action.payload;
      state.cards = state.cards.map((card) => ({
        ...card,
        ownerName: newName,
      }));
      state.newCard.ownerName = newName;
      localStorage.setItem("ownerName", action.payload); // Save to local storage
    },
  },
});

export const {
  addCard,
  setNumber,
  setOwnerName,
  setExpiryDate,
  setCvv,
  setVendor,
  deleteCard,
  resetNewCard,
} = addCardSlice.actions;

export default addCardSlice.reducer;
