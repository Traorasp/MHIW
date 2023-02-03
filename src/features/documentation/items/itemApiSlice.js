import apiSlice from '../../../app/api/apiSlice';

const itemApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createItem: builder.mutation({
      query: (data) => ({
        url: '/item',
        method: 'POST',
        body: data,
      }),
    }),
    getItem: builder.mutation({
      query: (id) => ({
        url: `/item/${id}`,
        method: 'GET',
      }),
    }),
    getItemList: builder.mutation({
      query: () => ({
        url: '/items',
        method: 'GET',
      }),
    }),
    updateItem: builder.mutation({
      query: (data) => ({
        url: '/item/update',
        method: 'POST',
        body: data,
      }),
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/item/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetItemMutation,
  useGetItemListMutation,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemApiSlice;
