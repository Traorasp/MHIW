/* eslint-disable no-underscore-dangle */
import apiSlice from '../../app/api/apiSlice';

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/profile/${data._id}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const { useUpdateProfileMutation } = userApiSlice;
