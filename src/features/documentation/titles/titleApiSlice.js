import apiSlice from '../../../app/api/apiSlice';

const titleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTitle: builder.mutation({
      query: (data) => ({
        url: '/title',
        method: 'POST',
        body: data,
      }),
    }),
    getTitle: builder.mutation({
      query: (id) => ({
        url: `/title/${id}`,
        method: 'GET',
      }),
    }),
    getTitleList: builder.mutation({
      query: () => ({
        url: '/titles',
        method: 'GET',
      }),
    }),
    updateTitle: builder.mutation({
      query: (data) => ({
        url: '/title/update',
        method: 'POST',
        body: data,
      }),
    }),
    deleteTitle: builder.mutation({
      query: (id) => ({
        url: `/title/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTitleMutation,
  useGetTitleListMutation,
  useCreateTitleMutation,
  useUpdateTitleMutation,
  useDeleteTitleMutation,
} = titleApiSlice;
