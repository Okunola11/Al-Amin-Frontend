import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const resultsAdapter = createEntityAdapter({});

const initialState = resultsAdapter.getInitialState();

export const resultsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResults: builder.query({
      query: () => ({
        url: "/results",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedData = responseData.map((result) => {
          result.id = result._id;
          return result;
        });
        return resultsAdapter.setAll(initialState, loadedData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Result", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Result", id })),
          ];
        } else {
          return [{ type: "Result", id: "LIST" }];
        }
      },
    }),
    createNewResult: builder.mutation({
      query: (initialData) => ({
        url: "/results",
        method: "POST",
        body: { ...initialData },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Result", id: "LIST" }],
    }),
    updateResult: builder.mutation({
      query: (initialData) => ({
        url: "/results",
        method: "PATCH",
        body: { ...initialData },
        invalidatesTags: (result, error, arg) => [
          { type: "Result", id: arg.id },
        ],
      }),
    }),
    deleteResult: builder.mutation({
      query: ({ id }) => ({
        url: "/results",
        method: "DELETE",
        body: { id },
        invalidatesTags: (result, error, arg) => [
          { type: "Result", id: arg.id },
        ],
      }),
    }),
  }),
});

export const {
  useGetResultsQuery,
  useCreateNewResultMutation,
  useUpdateResultMutation,
  useDeleteResultMutation,
} = resultsApiSlice;

// select all gotten data
export const selectResultsOutcome =
  resultsApiSlice.endpoints.getResults.select();

// create a memoised selector
const selectResultsData = createSelector(
  selectResultsOutcome,
  (selectResults) => selectResults.data
);

export const {
  selectAll: selectAllResults,
  selectById: selectResultsById,
  selectIds: selectResultsIds,
} = resultsAdapter.getSelectors(
  (state) => selectResultsData(state) ?? initialState
);
