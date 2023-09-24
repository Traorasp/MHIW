import apiSlice from '../../app/api/apiSlice';
import { logout, setCredentials } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(logout());
          console.log(data);
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.error(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/refresh',
        method: 'GET',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    postFriendsRequest: builder.mutation({
      query: (id) => ({
        url: `/friend/request/${id[0]}`,
        method: 'POST',
        body: { id: id[1] },
      }),
    }),
    DeleteReceivedFriendsRequest: builder.mutation({
      query: (id) => ({
        url: `/friend/request/remove/${id[0]}`,
        method: 'DELETE',
        body: { id: id[1] },
      }),
    }),
    DeleteFriend: builder.mutation({
      query: (id) => ({
        url: `/friend/remove/${id[0]}`,
        method: 'DELETE',
        body: { id: id[1] },
      }),
    }),
    postAcceptFriendsRequest: builder.mutation({
      query: (id) => ({
        url: `/friend/accept/${id[0]}`,
        method: 'POST',
        body: { id: id[1] },
      }),
    }),
    getFriendsList: builder.mutation({
      query: (id) => ({
        url: `/friends/${id}`,
        method: 'GET',
      }),
    }),
    getPendingList: builder.mutation({
      query: (id) => ({
        url: `/friend/request/${id}`,
        method: 'GET',
      }),
    }),
    getRequestList: builder.mutation({
      query: (id) => ({
        url: `/friend/sentrequests/${id}`,
        method: 'GET',
      }),
    }),
    getUsersList: builder.mutation({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendLogoutMutation,
  useRefreshMutation,
  usePostFriendsRequestMutation,
  useDeleteReceivedFriendsRequestMutation,
  useDeleteFriendMutation,
  usePostAcceptFriendsRequestMutation,
  useGetFriendsListMutation,
  useGetPendingListMutation,
  useGetRequestListMutation,
  useGetUsersListMutation,
} = authApiSlice;
