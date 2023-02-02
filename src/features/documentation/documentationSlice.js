/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const documentationSlice = createSlice({
  name: 'doc',
  initialState: {
    aoe: null,
    effects: null,
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
      const {
        aoe, effects, enchantments, items,
        magics, materials, races, skills, spells,
        talents, titles,
      } = action.payload;

      state.aoe = aoe;
      state.effects = effects;
      state.enchantments = enchantments;
      state.items = items;
      state.magics = magics;
      state.materials = materials;
      state.races = races;
      state.skills = skills;
      state.spells = spells;
      state.talents = talents;
      state.titles = titles;
    },
  },
});

export const { setDoc } = documentationSlice.actions;

export default documentationSlice.reducer;
