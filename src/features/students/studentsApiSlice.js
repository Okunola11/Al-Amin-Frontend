import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const studentsAdapter = createEntityAdapter({});

const initialState = studentsAdapter.getInitialState();

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => ({
        url: "/students",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedData = responseData.map((student) => {
          student.id = student._id;
          return student;
        });
        return studentsAdapter.setAll(initialState, loadedData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Student", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Student", id })),
          ];
        } else {
          return [{ type: "Student", id: "LIST" }];
        }
      },
    }),
    createNewStudent: builder.mutation({
      query: (initialData) => ({
        url: "/students",
        method: "POST",
        body: { ...initialData },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Student", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetStudentsQuery, useCreateNewStudentMutation } =
  studentsApiSlice;

// select all gotten students
export const selectStudentsResult =
  studentsApiSlice.endpoints.getStudents.select();

// create a memoised selector
const selectStudentsData = createSelector(
  selectStudentsResult,
  (studentsResult) => studentsResult.data
);

export const {
  selectAll: selectAllStudents,
  selectById: selectStudentsById,
  selectIds: selectStudentsIds,
} = studentsAdapter.getSelectors(
  (state) => selectStudentsData(state) ?? initialState
);
