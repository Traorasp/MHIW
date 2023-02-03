import apiSlice from '../../../app/api/apiSlice';

const enchantmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEnchantment: builder.mutation({
      query: (data) => ({
        url: '/enchantment',
        method: 'POST',
        body: data,
      }),
    }),
    getEnchantment: builder.mutation({
      query: (id) => ({
        url: `/enchantment/${id}`,
        method: 'GET',
      }),
    }),
    getEnchantmentList: builder.mutation({
      query: () => ({
        url: '/enchantments',
        method: 'GET',
      }),
    }),
    deleteEnchantment: builder.mutation({
      query: (id) => ({
        url: `/enchantment/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetEnchantmentMutation,
  useGetEnchantmentListMutation,
  useCreateEnchantmentMutation,
  useDeleteEnchantmentMutation,
} = enchantmentApiSlice;
