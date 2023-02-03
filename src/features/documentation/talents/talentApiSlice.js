import apiSlice from '../../../app/api/apiSlice';

const talentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTalent: builder.mutation({
      query: (data) => ({
        url: '/talent',
        method: 'POST',
        body: data,
      }),
    }),
    getTalent: builder.mutation({
      query: (id) => ({
        url: `/talent/${id}`,
        method: 'GET',
      }),
    }),
    getTalentList: builder.mutation({
      query: () => ({
        url: '/talents',
        method: 'GET',
      }),
    }),
    updateTalent: builder.mutation({
      query: (data) => ({
        url: '/talent/update',
        method: 'POST',
        body: data,
      }),
    }),
    deleteTalent: builder.mutation({
      query: (id) => ({
        url: `/talent/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTalentMutation,
  useGetTalentListMutation,
  useCreateTalentMutation,
  useUpdateTalentMutation,
  useDeleteTalentMutation,
} = talentApiSlice;
