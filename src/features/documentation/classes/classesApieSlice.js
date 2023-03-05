import apiSlice from '../../../app/api/apiSlice';

const classesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createClasses: builder.mutation({
      query: (data) => ({
        url: '/class',
        method: 'POST',
        body: data,
      }),
    }),
    getClasses: builder.mutation({
      query: (id) => ({
        url: `/class/${id}`,
        method: 'GET',
      }),
    }),
    getClassesList: builder.mutation({
      query: () => ({
        url: '/classs',
        method: 'GET',
      }),
    }),
    updateClasses: builder.mutation({
      query: (data) => ({
        url: '/class/update',
        method: 'POST',
        body: data,
      }),
    }),
    deleteClasses: builder.mutation({
      query: (id) => ({
        url: `/class/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetClassesMutation,
  useGetClassesListMutation,
  useCreateClassesMutation,
  useUpdateClassesMutation,
  useDeleteClassesMutation,
} = classesApiSlice;
