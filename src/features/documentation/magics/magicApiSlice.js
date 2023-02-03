import apiSlice from '../../../app/api/apiSlice';

const magicApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMagic: builder.mutation({
      query: (data) => ({
        url: '/magic',
        method: 'POST',
        body: data,
      }),
    }),
    getMagic: builder.mutation({
      query: (id) => ({
        url: `/magic/${id}`,
        method: 'GET',
      }),
    }),
    getMagicList: builder.mutation({
      query: () => ({
        url: '/magics',
        method: 'GET',
      }),
    }),
    updateMagic: builder.mutation({
      query: (data) => ({
        url: '/magic/update',
        method: 'POST',
        body: data,
      }),
    }),
    deleteMagic: builder.mutation({
      query: (id) => ({
        url: `/magic/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetMagicMutation,
  useGetMagicListMutation,
  useCreateMagicMutation,
  useUpdateMagicMutation,
  useDeleteMagicMutation,
} = magicApiSlice;
