import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    studentLogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/student",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useUserLoginMutation, useStudentLoginMutation } = authApiSlice;
