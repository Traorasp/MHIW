import apiSlice from '../../app/api/apiSlice';

export const imageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.mutation({
      query: (imageId) => ({
        url: `/image/${imageId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useProfileMutation } = imageApiSlice;
