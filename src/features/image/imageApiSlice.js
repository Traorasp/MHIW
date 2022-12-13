import apiSlice from '../../app/api/apiSlice';

export const imageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getImage: builder.mutation({
      query: (imageId) => ({
        url: `/image/${imageId}`,
        method: 'GET',
      }),
    }),
    setImage: builder.mutation({
      query: (image) => ({
        url: '/image',
        method: 'POST',
        credentials: 'include',
        body: image,
      }),
    }),
  }),
});

export const { useGetImageMutation, useSetImageMutation } = imageApiSlice;
