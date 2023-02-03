import apiSlice from '../../../app/api/apiSlice';

const materialApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMaterial: builder.mutation({
      query: (data) => ({
        url: '/material',
        method: 'POST',
        body: data,
      }),
    }),
    getMaterial: builder.mutation({
      query: (id) => ({
        url: `/material/${id}`,
        method: 'GET',
      }),
    }),
    getMaterialList: builder.mutation({
      query: () => ({
        url: '/materials',
        method: 'GET',
      }),
    }),
    updateMaterial: builder.mutation({
      query: (data) => ({
        url: '/material/update',
        method: 'POST',
        body: data,
      }),
    }),
    deleteMaterial: builder.mutation({
      query: (id) => ({
        url: `/material/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetMaterialMutation,
  useGetMaterialListMutation,
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
} = materialApiSlice;
