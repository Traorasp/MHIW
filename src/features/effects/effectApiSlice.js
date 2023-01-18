import apiSlice from '../../app/api/apiSlice';

const effectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEffect: builder.mutation({
      query: (data) => ({
        url: '/effect',
        method: 'POST',
        body: data,
      }),
    }),
    getEffect: builder.mutation({
      query: (id) => ({
        url: `/effect/${id}`,
        method: 'GET',
      }),
    }),
    getEffectList: builder.mutation({
      query: () => ({
        url: '/effects',
        method: 'GET',
      }),
    }),
    updateEffect: builder.mutation({
      query: (data) => ({
        url: '/effect/update',
        method: 'POST',
        body: data,
      }),
    }),
    deleteEffect: builder.mutation({
      query: (id) => ({
        url: `/effect/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetEffectMutation,
  useGetEffectListMutation,
  useCreateEffectMutation,
  useUpdateEffectMutation,
  useDeleteEffectMutation,
} = effectApiSlice;
