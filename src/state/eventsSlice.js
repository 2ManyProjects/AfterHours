import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentEvent: null,
  pastEvents: [],
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setCurrentEvent: (state, action) => {
      state.currentEvent = action.payload;
    },
    setPastEvents: (state, action) => {
      state.pastEvents = action.payload;
    },
  },
});

export const { setCurrentEvent, setPastEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
