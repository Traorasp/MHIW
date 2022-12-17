import apiSlice from '../../app/api/apiSlice';

export const imageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useSetImageMutation } = imageApiSlice;
