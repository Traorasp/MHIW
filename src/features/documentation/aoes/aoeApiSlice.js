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
    getAOE: builder.mutation({
      query: (id) => ({
        url: `/aoe/${id}`,
        method: 'GET',
      }),
    }),
    getAOEList: builder.mutation({
      query: () => ({
        url: '/aoes',
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
  useGetAOEMutation,
  useGetAOEListMutation,
  useCreateAOEMutation,
  useUpdateAOEMutation,
  useDeleteAOEMutation,
} = aoeApiSlice;
