import apiSlice from '../../../app/api/apiSlice';

const spellApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSpell: builder.mutation({
      query: (data) => ({
        url: '/spell',
        method: 'POST',
        body: data,
      }),
    }),
    getSpell: builder.mutation({
      query: (id) => ({
        url: `/spell/${id}`,
        method: 'GET',
      }),
    }),
    getSpellList: builder.mutation({
      query: () => ({
        url: '/spells',
        method: 'GET',
      }),
    }),
    updateSpell: builder.mutation({
      query: (data) => ({
        url: '/spell/update',
        method: 'POST',
        body: data,
      }),
    }),
    deleteSpell: builder.mutation({
      query: (id) => ({
        url: `/spell/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetSpellMutation,
  useGetSpellListMutation,
  useCreateSpellMutation,
  useUpdateSpellMutation,
  useDeleteSpellMutation,
} = spellApiSlice;
