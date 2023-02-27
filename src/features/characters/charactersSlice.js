/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const characterSlice = createSlice({
  name: 'char',
  initialState: { characters: null },
  reducers: {
    setCharacterList: (state, action) => {
      const { characters } = action.payload;
      state.characters = characters;
    },
  },
});

export const {
  setCharacterList,
} = characterSlice.actions;

export default characterSlice.reducer;

export const selectCurrentCharacters = (state) => state.char.characters;
