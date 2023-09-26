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
        number: "1234567812345678",
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
    activeCard: JSON.parse(localStorage.getItem("activeCard")) || {},
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
    setActiveCard: (state, action) => {
      let activeCard = action.payload;
      localStorage.setItem("activeCard", JSON.stringify(activeCard));
      state.activeCard = activeCard;
    },
  },
  extraReducers: {
    [getOwnerName.pending]: (state) => {
      state.status = "Loading";
    },
    [getOwnerName.fulfilled]: (state, action) => {
      state.status = "Success!";
      const newName = action.payload;

      // Update ownerName for all cards in state.cards
      state.cards = state.cards.map((card) => ({
        ...card,
        ownerName: newName,
      }));

      // Update ownerName for all cards in localStorage
      const cardsInLocalStorage =
        JSON.parse(localStorage.getItem("cards")) || state.cards;
      const updatedCardsInLocalStorage = cardsInLocalStorage.map((card) => ({
        ...card,
        ownerName: newName,
      }));
      localStorage.setItem("cards", JSON.stringify(updatedCardsInLocalStorage));

      // Update ownerName for activeCard (if it's an object)
      state.activeCard = {
        ...state.cards[0],
        ownerName: newName,
      };

      // Update ownerName for newCard
      state.newCard.ownerName = newName;

      // Update ownerName in localStorage
      localStorage.setItem("ownerName", action.payload);
      localStorage.setItem("activeCard", JSON.stringify(state.activeCard));
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
  setActiveCard,
} = addCardSlice.actions;

export default addCardSlice.reducer;
