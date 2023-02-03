import apiSlice from '../../../app/api/apiSlice';

const raceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRace: builder.mutation({
      query: (data) => ({
        url: '/race',
        method: 'POST',
        body: data,
      }),
    }),
    getRace: builder.mutation({
      query: (id) => ({
        url: `/race/${id}`,
        method: 'GET',
      }),
    }),
    getRaceList: builder.mutation({
      query: () => ({
        url: '/races',
        method: 'GET',
      }),
    }),
    updateRace: builder.mutation({
      query: (data) => ({
        url: '/race/update',
        method: 'POST',
        body: data,
      }),
    }),
    deleteRace: builder.mutation({
      query: (id) => ({
        url: `/race/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetRaceMutation,
  useGetRaceListMutation,
  useCreateRaceMutation,
  useUpdateRaceMutation,
  useDeleteRaceMutation,
} = raceApiSlice;
