import apiSlice from '../../../app/api/apiSlice';

const skillApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSkill: builder.mutation({
      query: (data) => ({
        url: '/skill',
        method: 'POST',
        body: data,
      }),
    }),
    getSkill: builder.mutation({
      query: (id) => ({
        url: `/skill/${id}`,
        method: 'GET',
      }),
    }),
    getSkillList: builder.mutation({
      query: () => ({
        url: '/skills',
        method: 'GET',
      }),
    }),
    updateSkill: builder.mutation({
      query: (data) => ({
        url: '/skill/update',
        method: 'POST',
        body: data,
      }),
    }),
    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/skill/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetSkillMutation,
  useGetSkillListMutation,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillApiSlice;
