import apiSlice from '../../app/api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.mutation({
      query: (imageId) => ({
        url: `/image/${imageId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useProfileMutation } = userApiSlice;
