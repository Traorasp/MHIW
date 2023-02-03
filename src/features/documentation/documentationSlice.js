/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const documentationSlice = createSlice({
  name: 'doc',
  initialState: {
    aoe: 5,
    effects: 25,
    enchantments: null,
    items: null,
    magics: null,
    materials: null,
    races: null,
    skills: null,
    spells: null,
    talents: null,
    titles: null,
  },
  reducers: {
    setDoc: (state, action) => {
      [
        state.aoe,
        state.effects,
        state.enchantments,
        state.items,
        state.magics,
        state.materials,
        state.races,
        state.skills,
        state.spells,
        state.talents,
        state.titles,
      ] = action.payload;
    },
  },
});

export const { setDoc } = documentationSlice.actions;

export default documentationSlice.reducer;
