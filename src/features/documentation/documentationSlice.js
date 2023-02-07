/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const documentationSlice = createSlice({
  name: 'doc',
  initialState: {
    aoes: null,
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
      [
        state.aoes,
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
    addDoc: (state, action) => {
      const { key, data } = action.payload;
      state[key] = { data };
    },
  },
});

export const { setDoc, addDoc } = documentationSlice.actions;

export default documentationSlice.reducer;

export const selectCurrentAoes = (state) => state.doc.aoes;
export const selectCurrentEffects = (state) => state.doc.effects;
export const selectCurrentEnchantments = (state) => state.doc.enchantments;
export const selectCurrentItems = (state) => state.doc.items;
export const selectCurrentMagics = (state) => state.doc.magics;
export const selectCurrentMaterials = (state) => state.doc.materials;
export const selectCurrentRaces = (state) => state.doc.races;
export const selectCurrentSkills = (state) => state.doc.skills;
export const selectCurrentSpells = (state) => state.doc.spells;
export const selectCurrentTalents = (state) => state.doc.talents;
export const selectCurrentTitles = (state) => state.doc.titles;
