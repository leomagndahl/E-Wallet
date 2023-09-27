import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getOwnerName = createAsyncThunk("addCardSlice/getOwnerName", async () => {
  let res = await axios.get("https://randomuser.me/api/");
  let data = res.data.results[0];
  let name = `${data.name.first} ${data.name.last}`;
  return name.toUpperCase();
});

const initialOwnerName = sessionStorage.getItem("ownerName");

const addCardSlice = createSlice({
  name: "add-card",
  initialState: {
    status: "",
    cards: JSON.parse(sessionStorage.getItem("cards")) || [
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
    activeCard: JSON.parse(sessionStorage.getItem("activeCard")) || {},
  },
  reducers: {
    addCard: (state, action) => {
      state.cards.push(action.payload);
      sessionStorage.setItem("cards", JSON.stringify(state.cards));
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
      sessionStorage.setItem("cards", JSON.stringify(updatedCards));

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
      sessionStorage.setItem("activeCard", JSON.stringify(activeCard));
      state.activeCard = activeCard;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOwnerName.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getOwnerName.fulfilled, (state, action) => {
        const newName = action.payload;

        state.cards = state.cards.map((card) => ({
          ...card,
          ownerName: newName,
        }));

        state.activeCard = {
          ...state.cards[0],
          ownerName: newName,
        };

        state.newCard.ownerName = newName;
        state.status = "Success!";

        sessionStorage.setItem("ownerName", newName);
        sessionStorage.setItem("activeCard", JSON.stringify(state.activeCard));
        sessionStorage.setItem("cards", JSON.stringify(state.cards));
      });
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
