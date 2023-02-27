import apiSlice from '../../app/api/apiSlice';

export const characterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCharacterDetails: builder.mutation({
      query: (id) => ({
        url: `/character/${id}`,
        method: 'GET',
      }),
    }),
    getCharacterList: builder.mutation({
      query: (id) => ({
        url: `/characters/${id}`,
        method: 'GET',
      }),
    }),
    createCharacter: builder.mutation({
      query: (data) => ({
        url: '/character',
        method: 'POST',
        body: data,
      }),
    }),
    updateCharacter: builder.mutation({
      query: (data) => ({
        url: '/character/update',
        method: 'POST',
        body: data,
      }),
    }),
    deleteCharacter: builder.mutation({
      query: (id) => ({
        url: `/character/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCharacterDetailsMutation,
  useGetCharacterListMutation,
  useCreateCharacterMutation,
  useUpdateCharacterMutation,
  useDeleteCharacterMutation,
} = characterApiSlice;
