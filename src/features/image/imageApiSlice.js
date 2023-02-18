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
    updateImage: builder.mutation({
      query: (data) => ({
        url: `/image/${data.get('id')}`,
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
    }),
    deleteImage: builder.mutation({
      query: (data) => ({
        url: `/image/${data}`,
        method: 'DELETE',
        credentials: 'include',
        body: data,
      }),
    }),
  }),
});

export const {
  useSetImageMutation,
  useUpdateImageMutation,
  useDeleteImageMutation,
} = imageApiSlice;
