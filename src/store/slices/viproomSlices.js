import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const roomvipSlices = createSlice({
  name: "roomvipSlices",
  initialState,
  reducers: {
    updateRoomvip: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { updateRoomvip } = roomvipSlices.actions;

export default roomvipSlices.reducer;
