import apiSlice from '../../../app/api/apiSlice';

const aoeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAOE: builder.mutation({
      query: (data) => ({
        url: '/aoe',
        method: 'POST',
        body: data,
      }),
    }),
    getAOEList: builder.mutation({
      query: () => ({
        url: '/aoe',
        method: 'GET',
      }),
    }),
    updateAOE: builder.mutation({
      query: (data) => ({
        url: '/aoe/update',
        method: 'POST',
        body: data,
      }),
    }),
    deleteAOE: builder.mutation({
      query: (id) => ({
        url: `/aoe/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAOEListMutation,
  useCreateAOEMutation,
  useUpdateAOEMutation,
  useDeleteAOEMutation,
} = aoeApiSlice;
